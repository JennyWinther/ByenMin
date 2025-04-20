package com.MinBy.Controllers;

import com.MinBy.DTOs.VaerDataResponsDTO;
import com.MinBy.Servicer.VærService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Enkelt endepunkt for å hente vær på ett sted.
@RestController
@RequestMapping("/vaeret/")
@CrossOrigin(origins = "${frontend.url}", allowCredentials = "true")
public class VærController {
    @Autowired
    VærService værService;

    @GetMapping(value = "forsideVaer/{sted}")
    private List<VaerDataResponsDTO> HentVaeretIdag(@PathVariable String sted){
        return værService.HentVaeretIdag(sted);
    }

}
