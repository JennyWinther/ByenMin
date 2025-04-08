package com.MinBy.Servicer;

import com.MinBy.DTOs.VaerDataResponsDTO;
import com.MinBy.Entiteter.GeoapifySted.Stedsinformasjon;
import com.MinBy.Entiteter.GeoapifySted.StedsinformasjonWrapper;
import com.MinBy.Entiteter.Vær.DetaljKlasser.Fremtidsvarsel;
import com.MinBy.Entiteter.Vær.DetaljKlasser.InstantWrapper;
import com.MinBy.Entiteter.Vær.Timeseries;
import com.MinBy.Entiteter.Vær.YttersteVærWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class VærService {

    // API-nøkkel for Geoapify.
    @Value("${app.api.key}")
    private String apiKey;
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();

    // Geoapify, finner latitude/longitude fra stedsnavn.
    String geoUrl = "https://api.geoapify.com/v1/geocode/search?text=%s&lang=en&limit=5&type=city&format=json";

    // Meterologisk Institutt sin API for værmeldinger.
    String metUrlBase = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

    // Henter første resultat i liste over GeoKommuner fra Geoapify. OBS: aksepterer Æ, Ø, Å!
    public Stedsinformasjon HentGeoKommForSted(String kommune){
        String queryRes = String.format(geoUrl, kommune);

        StedsinformasjonWrapper resultat = restTemplate.getForObject(queryRes + "&apiKey=" + apiKey, StedsinformasjonWrapper.class);
        return resultat.getResults().getFirst();
    }

    // Formaterer Longitude/Latitude for sted til 4 desimaler. Dette er for å følge API retningslinjer hos api.met.no.
    public Double AvrundLonLatTilFireDesimaler(Double longOrLatValue){
        DecimalFormat format = new DecimalFormat("#.####");
        return Double.parseDouble(format.format(longOrLatValue));
    }

    // Henter og lager en liste med DTO objekter per tidspunkt (per time), og returnerer listen.
    // Listen inneholder info som skal vises i frontend. 
    public List<VaerDataResponsDTO> HentVaeretIdag(String sted){
        // Hente latitude/longitude fra Geoapify.
        Stedsinformasjon stedsInfo = HentGeoKommForSted(sted);
        String query = String.format("?lat=%s&lon=%s", stedsInfo.getLat(), stedsInfo.getLon());

        // Lage header, inkl. kontaktinformasjon i eget User-Agent felt per Terms of Service hos api.met.no.
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("User-Agent", "jenny1_2_3@hotmail.com, https://github.com/JennyWinther/ByenMin");
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        // Hente respons med vær fra compact-versjonen av API.
        ResponseEntity<YttersteVærWrapper> råRespons = restTemplate.exchange(
                metUrlBase + query,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<>() {});

        // Deklarerer variabler til senere bruk
        String tidspunkt, vaersymbol;
        double luftTemperatur, vindHastighet, nedbor;

        try{
            YttersteVærWrapper værdata = råRespons.getBody();

            if(værdata.getProperties().getTimeseries() == null){
                throw new RuntimeException("Feil ved henting av værdata: `timeseries` er null.");
            }

            List<VaerDataResponsDTO> dtoListe = new ArrayList<>();

            //For hver timeseries, hent ut nødvendig info til å fylle DTO-objekt, og legg det nye objektet til i listen.
            for(Timeseries data : værdata.getProperties().getTimeseries()) {
                InstantWrapper instantWrapper = data.getData().getInstant();

                tidspunkt = data.getTime();
                luftTemperatur = instantWrapper.getDetaljer().getLuftTemperatur();
                vindHastighet = instantWrapper.getDetaljer().getHastighetVind();

                Fremtidsvarsel enTime = data.getData().getNext1Hours();
                Fremtidsvarsel seksTimer = data.getData().getNext6Hours();
                Fremtidsvarsel tolvTimer = data.getData().getNext12Hours();

                // Utover for de første 50-60 timeseriene, så er det ikke sikkert at varsel finnes for 1 time/6 timer/12 timer i fremtiden.
                // Derfor må vi sjekke hver gang, hva som er inkludert, og basere resultatet på det nærmeste timeantallet den timeserien.
                if(enTime != null){
                    nedbor = enTime.getDetails().getNedbørsmengde();
                    vaersymbol = enTime.getSummary().getSymbolCode();
                }
                else if(seksTimer != null){
                    nedbor = seksTimer.getDetails().getNedbørsmengde();
                    vaersymbol = seksTimer.getSummary().getSymbolCode();
                } else if(tolvTimer != null){
                    nedbor = tolvTimer.getDetails().getNedbørsmengde();
                    vaersymbol = tolvTimer.getSummary().getSymbolCode();
                }
                else{
                    nedbor = 0;
                    vaersymbol = "Ukjent";
                }

                VaerDataResponsDTO dto = new VaerDataResponsDTO(
                        tidspunkt,
                        luftTemperatur,
                        vindHastighet,
                        nedbor,
                        vaersymbol
                );

                dtoListe.add(dto);
            }
            return dtoListe;

        }catch (Exception e) {
            throw new RuntimeException("Feil ved parsing av body");
        }
    }
}
