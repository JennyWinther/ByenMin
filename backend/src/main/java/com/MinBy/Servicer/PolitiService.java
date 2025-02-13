package com.MinBy.Servicer;

import com.MinBy.Entiteter.Politi.Melding;
import com.MinBy.Entiteter.Politi.MeldingWrapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PolitiService {
    private final String basePolitiUrl = "https://api.politiet.no/politiloggen/v1/";
    RestTemplate restTemplate = new RestTemplate();

    public List<Melding> HentAlleNyesteMeldinger(){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date&Take=50", MeldingWrapper.class);
        return resultat.getData();
    }
    public List<Melding> HentTiMeldinger(){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date", MeldingWrapper.class);
        return resultat.getData();
    }

    public List<Melding> HentEtterDato(String dato1, String dato2){

        String query = "messages?DateFrom=%s&DateTo=%s";
        String queryRes = String.format(query, dato1, dato2);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat.getData();
    }

    public List<Melding> HentEtterDistrikt(String distrikt){
        String query = "messages?Districts=%s&Take=50";
        String queryRes = String.format(query, distrikt);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat.getData();
    }

    public List<Melding> HentEtterDistriktOgDato(String distrikt, String dato1, String dato2){
        if(LocalDate.parse(dato1).isAfter(LocalDate.parse(dato2))){     //Hvis dato1 er etter dato2, returner tom liste
            return List.of();
        }

        String query = "messages?Districts=%s&DateFrom=%s&DateTo=%s";
        String queryRes = String.format(query, distrikt, dato1, dato2);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat.getData();
    }

    public List<Melding> SokEtterFiltrertResultat(
            Optional<String> kategori,
            Optional<String> distrikt,
            Optional<String> kommune,
            Optional<String> datoFra,
            Optional<String> datoTil
    ){
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(basePolitiUrl)
                .path("/messages");

        if (kategori.isPresent() && !kategori.get().isEmpty()) {
            builder.queryParam("Categories", kategori);
        }
        if (distrikt.isPresent() && !distrikt.get().isEmpty()) {
            builder.queryParam("Districts", distrikt);
        }
        if (kommune.isPresent() && !kommune.get().isEmpty()) {
            builder.queryParam("Municipalities", kommune);
        }
        if (datoFra.isPresent() && !datoFra.get().isEmpty()) {
            builder.queryParam("DateFrom", datoFra);
        }
        if (datoTil.isPresent() && !datoTil.get().isEmpty()) {
            builder.queryParam("DateTo", datoTil);
        }

        UriComponents components = builder.build(false);
        String url = components.toUriString();

        MeldingWrapper resultat = restTemplate.getForObject(url, MeldingWrapper.class);

        return resultat.getData();
    }

    public List<Melding> HentTilWidget(String kommune) {
        String query = "messages?Municipalities=%s&Take=5";
        String queryRes = String.format(query, kommune);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat.getData();
    }
}
