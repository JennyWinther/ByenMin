package com.MinBy.Controllers;

import com.MinBy.DTOs.VaerDataResponsDTO;
import com.MinBy.Servicer.VærService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vaeret/")
@CrossOrigin
public class VærController {

    // Endepunkter for å hente værinformasjon fra API.

    @Autowired
    VærService værService;

    @GetMapping(value = "forsideVær/{sted}")
    private List<VaerDataResponsDTO> HentVaeretIdag(@PathVariable String sted){
        return værService.HentVaeretIdag(sted);
    }




}
