package com.MinBy.Servicer;

import com.MinBy.DTOs.VaerDataResponsDTO;
import com.MinBy.Entiteter.Geo.GeoKommune;
import com.MinBy.Entiteter.Geo.GeoKommuneWrapper;
import com.MinBy.Entiteter.Vaer.DetaljKlasser.NaverendeVaerDetaljer;
import com.MinBy.Entiteter.Vaer.DetaljKlasser.VaerOppsummering;
import com.MinBy.Entiteter.Vaer.VaerData;
import com.MinBy.Entiteter.Vaer.VaerDataDetaljer;
import com.MinBy.Entiteter.Vaer.VaerDataWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class VaerService {

    // API-nøkkel for Geoapify.
    @Value("${app.api.key")
    private String apiKey;
    RestTemplate restTemplate = new RestTemplate();

    // Geoapify, finner latitude/longitude fra stedsnavn.
    String geoUrl = "https://api.geoapify.com/v1/geocode/search?text=%s&lang=en&limit=5&type=city&format=json";

    // Meterologisk Institutt sin API for værmeldinger.
    String metUrlBase = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

    // Henter første resultat i liste over GeoKommuner fra Geoapify. OBS: aksepterer Æ, Ø, Å!
    public GeoKommune HentGeoKommForSted(String kommune){
        String queryRes = String.format(geoUrl, kommune);

        GeoKommuneWrapper resultat = restTemplate.getForObject(queryRes + "&apiKey=" + apiKey, GeoKommuneWrapper.class);
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
        GeoKommune stedsInfo = HentGeoKommForSted(sted);
        String query = String.format("?lat=%s&lon=%s", stedsInfo.getLat(), stedsInfo.getLon());

        VaerDataWrapper værdata = restTemplate.getForObject(metUrlBase + query, VaerDataWrapper.class);

        String tidspunkt, vaersymbol;
        double luftTemperatur, vindHastighet;
        VaerOppsummering nedbor;


        List<VaerDataResponsDTO> dtoListe = new ArrayList<>();

        for(VaerData detaljer : værdata.getTimeseries()){
            NaverendeVaerDetaljer instantDetaljer = detaljer.getData().getInstant();

            tidspunkt = detaljer.getTime();
            luftTemperatur = instantDetaljer.getAirTemperature();
            vindHastighet = instantDetaljer.getWindSpeed();
            nedbor = detaljer.getData().getNext6Hours().getDetails();
            vaersymbol = detaljer.getData().getNext6Hours().getSummary().getSymbolCode();

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
    }

}
