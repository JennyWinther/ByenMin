package com.MinBy.Controllers;
import com.MinBy.Entiteter.Melding;
import com.MinBy.Entiteter.MeldingWrapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
@RequestMapping("/politiloggen")
@CrossOrigin(origins = "http://localhost:5173")
public class PolitiController {

    private String basePolitiUrl = "https://api.politiet.no/politiloggen/v1/"; //messages?SortBy=Date

    @GetMapping(value = "/hentAlle")
    private List<Melding> HentAlleMeldinger(){
        RestTemplate restTemplate = new RestTemplate();
        MeldingWrapper resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date", MeldingWrapper.class);
        return resultat != null ? resultat.getData() : List.of();
    }


}
