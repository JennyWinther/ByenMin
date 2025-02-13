package com.MinBy.Controllers;
import com.MinBy.Entiteter.Politi.Melding;
import com.MinBy.Servicer.PolitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/politiloggen")
@CrossOrigin
public class PolitiController {

    // Henter data fra Politiloggens API. Exposer endepunktfor å kunne hente ut mer spesifikke data, som
    // politidistrikt, hendelser i kommuner/mer lokale steder, eller innenfor et spenn av datoer.

    @Autowired
    PolitiService politiService;

    //Henter 50 av de nyeste, ufiltrert.
    @GetMapping(value = "/hentAlle")
    private List<Melding> HentAlleMeldinger(){
        return politiService.HentAlleNyesteMeldinger();
    }

    //For forsiden - henter nyeste 10, ufiltrert.
    @GetMapping(value = "/hentTi")
    private List<Melding> HentTiMeldinger(){
        return politiService.HentTiMeldinger();
    }

    //Dato1: første/dagens dato
    //Dato2: andre dato
    @GetMapping(value = "/hentEtterDato/{dato1}/{dato2}")
    private List<Melding> HentEtterDato(@PathVariable String dato1, @PathVariable String dato2){
        return politiService.HentEtterDato(dato1, dato2);
    }

    //Finn 50 siste i Politidistrikt
    @GetMapping(value = "/hentEtterDistrikt/{distrikt}")
    private List<Melding> HentEtterDistrikt(@PathVariable String distrikt){
        return politiService.HentEtterDistrikt(distrikt);
    }

    //Henter de siste 5 meldingene i brukers valgte kommune. Til bruk på forside.
    @GetMapping(value = "/hentTilWidget/{kommune}")
    private List<Melding> HentTilWidget(@PathVariable String kommune){
        return politiService.HentTilWidget(kommune);
    }

    //Finn 50 siste i Politidistrikt, mellom dato1 og dato2
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
