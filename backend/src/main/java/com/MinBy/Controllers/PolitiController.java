package com.MinBy.Controllers;
import com.MinBy.Entiteter.Melding;
import com.MinBy.PolitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/politiloggen")
@CrossOrigin
public class PolitiController {
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
