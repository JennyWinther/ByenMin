package com.MinBy.Controllers;
import com.MinBy.Entiteter.Melding;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class PolitiController {

    private String basePolitiUrl = "https://api.politiet.no/politiloggen/v1/"; //messages?SortBy=Date

    @GetMapping(value = "hentAlleMeldinger")
    private Melding HentAlleMeldinger(){
        RestTemplate restTemplate = new RestTemplate();
        Melding resultat = restTemplate.getForObject(basePolitiUrl + "messages?SortBy=Date", Melding.class);
        return resultat;
    }


}
