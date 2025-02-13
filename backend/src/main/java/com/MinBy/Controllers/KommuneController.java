package com.MinBy.Controllers;

import com.MinBy.Entiteter.Politi.Kommune;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@RestController
@RequestMapping("/kommuner")
@CrossOrigin
public class KommuneController {

//    Henter data fra Kartverket sin API, spesifikt en liste over alle kommuner i Norge. Har ingenting
//    med værinformasjon å gjøre.

    private String kommuneUrl = "https://api.kartverket.no/kommuneinfo/v1/kommuner";
    RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/alle")
    public List<Kommune> HentAlleKommuner(){
        ResponseEntity<List<Kommune>> response = restTemplate.exchange(
                kommuneUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Kommune>>() {}
        );

        List<Kommune> kommuner = response.getBody();
        return kommuner != null ? kommuner : List.of();
    }
}
