package com.MinBy.Controllers;
import com.MinBy.Entiteter.Melding;
import com.MinBy.Entiteter.MeldingWrapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
@RequestMapping("/politiloggen")
@CrossOrigin
public class PolitiController {

    private String basePolitiUrl = "https://api.politiet.no/politiloggen/v1/";
    RestTemplate restTemplate = new RestTemplate();

    @GetMapping(value = "/hentAlle")
    private List<Melding> HentAlleMeldinger(){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date", MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }

    @GetMapping(value = "/hentEtterDistrikt/{distrikt}")
    private List<Melding> HentEtterDistrikt(@PathVariable String distrikt){
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?Districts=Oslo&SortBy=Date", MeldingWrapper.class);
        return  resultat != null ? resultat.getData() : List.of();
    }


}
