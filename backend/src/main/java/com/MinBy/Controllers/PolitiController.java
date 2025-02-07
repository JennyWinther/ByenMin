package com.MinBy.Controllers;
import com.MinBy.Entiteter.Melding;
import com.MinBy.Entiteter.MeldingWrapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/politiloggen")
@CrossOrigin
public class PolitiController {

    //API URL
    private String basePolitiUrl = "https://api.politiet.no/politiloggen/v1/";
    RestTemplate restTemplate = new RestTemplate();

    //Henter 50 av de nyeste, ufiltrert.
    @GetMapping(value = "/hentAlle")
    private List<Melding> HentAlleMeldinger(){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date&Take=50", MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }

    //For forsiden - henter nyeste 10, ufiltrert.
    @GetMapping(value = "/hentTi")
    private List<Melding> HentTiMeldinger(){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date", MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }

    //Dato1: første/dagens dato
    //Dato2: andre dato
    @GetMapping(value = "/hentEtterDato/{dato1}/{dato2}")
    private List<Melding> HentEtterDato(@PathVariable String dato1, @PathVariable String dato2){

        String query = "messages?DateFrom=%s&DateTo=%s";
        String queryRes = String.format(query, dato1, dato2);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }

    //Finn 50 siste i Politidistrikt
    @GetMapping(value = "/hentEtterDistrikt/{distrikt}")
    private List<Melding> HentEtterDistrikt(@PathVariable String distrikt){
        String query = "messages?Districts=%s&Take=50";
        String queryRes = String.format(query, distrikt);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return  resultat != null ? resultat.getData() : List.of();
    }

    //Finn 50 siste i Politidistrikt, mellom dato1 og dato2
    @GetMapping(value = "/hentEtterDistriktOgDato/{distrikt}/{dato1}/{dato2}")
    private List<Melding> HentEtterDistriktOgDato(@PathVariable String distrikt, @PathVariable String dato1, @PathVariable String dato2){
        if(LocalDate.parse(dato1).isAfter(LocalDate.parse(dato2))){     //Hvis dato1 er etter dato2, returner tom liste
            return List.of();
        }

        String query = "messages?Districts=%s&DateFrom=%s&DateTo=%s";
        String queryRes = String.format(query, distrikt, dato1, dato2);

        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + queryRes, MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }



}
