package com.MinBy.Controllers;
import com.MinBy.Entiteter.Politi.Melding;
import com.MinBy.Servicer.PolitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// Henter data fra Politiloggens API. Exposer endepunktfor å kunne hente ut mer spesifikke data, som
// politidistrikt, hendelser i kommuner/mer lokale steder, eller innenfor et spenn av datoer.

// Endpoint for å hente de 10 nyeste meldingene:        /hentAlle
// Endpoint for å hente 10 meldinger til forsiden:      /hentTi
// Endpoint for å hente etter dato:                     /hentEtterDato/{dato1}/{dato2}
// Endpoint for å hente etter politidistrikt:           /hentEtterDistrikt/{distrikt}
// Endpoint for å hente 5 meldinger til widget:         /hentTilWidget/{kommune}
// Endpoint for å hente 50 meldinger fra distrikt/dato: /hentEtterDistriktOgDato/{distrikt}/{dato1}/{dato2}
// Endpoint for å søke fritt i alle meldinger:          /sok


@RestController
@RequestMapping("/politiloggen")
@CrossOrigin(origins = "${frontend.url}", allowCredentials = "true")
public class PolitiController {
    @Autowired
    PolitiService politiService;

    @GetMapping(value = "/hentAlle")
    private List<Melding> HentAlleMeldinger(){
        return politiService.HentAlleNyesteMeldinger();
    }
    @GetMapping(value = "/hentTi")
    private List<Melding> HentTiMeldinger(){
        return politiService.HentTiMeldinger();
    }
    @GetMapping(value = "/hentEtterDato/{dato1}/{dato2}")
    private List<Melding> HentEtterDato(@PathVariable String dato1, @PathVariable String dato2){
        return politiService.HentEtterDato(dato1, dato2);
    }
    @GetMapping(value = "/hentEtterDistrikt/{distrikt}")
    private List<Melding> HentEtterDistrikt(@PathVariable String distrikt){
        return politiService.HentEtterDistrikt(distrikt);
    }
    @GetMapping(value = "/hentTilWidget/{kommune}")
    private List<Melding> HentTilWidget(@PathVariable String kommune){
        return politiService.HentTilWidget(kommune);
    }

    @GetMapping(value = "/hentEtterDistriktOgDato/{distrikt}/{dato1}/{dato2}")
    private List<Melding> HentEtterDistriktOgDato(@PathVariable String distrikt, @PathVariable String dato1, @PathVariable String dato2){
        return politiService.HentEtterDistriktOgDato(distrikt, dato1, dato2);
    }
    @GetMapping(value = "/sok")
    private List<Melding> SokEtterFiltrertResultat(
            @RequestParam(required = false) String kategori,
            @RequestParam(required = false) String distrikt,
            @RequestParam(required = false) String kommune,
            @RequestParam(required = false) String datoFra,
            @RequestParam(required = false) String datoTil
    ){
        return politiService.SokEtterFiltrertResultat(
                Optional.ofNullable(kategori),
                Optional.ofNullable(distrikt),
                Optional.ofNullable(kommune),
                Optional.ofNullable(datoFra),
                Optional.ofNullable(datoTil));
    }
}
