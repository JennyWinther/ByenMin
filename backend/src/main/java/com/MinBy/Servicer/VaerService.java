package com.MinBy.Servicer;

import com.MinBy.Entiteter.Geo.GeoKommune;
import com.MinBy.Entiteter.Geo.GeoKommuneWrapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;

@Service
public class VaerService {

    // API-nøkkel for Geoapify.
    @Value("${app.api.key")
    private String apiKey;
    RestTemplate restTemplate = new RestTemplate();

    // Geoapify, finner latitude/longitude fra stedsnavn.
    String geoUrl = "https://api.geoapify.com/v1/geocode/search?text=%s&lang=en&limit=5&type=city&format=json";

    // Meterologisk Institutt sin API for værmeldinger.
    String metUrlBase = "https://api.met.no/weatherapi/locationforecast/2.0/";

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


}
