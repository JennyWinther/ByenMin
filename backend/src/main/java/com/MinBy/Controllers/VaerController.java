package com.MinBy.Controllers;

import com.MinBy.DTOs.VaerDataResponsDTO;
import com.MinBy.Servicer.VaerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vaeret/")
@CrossOrigin
public class VaerController {

    @Autowired
    VaerService vaerService;

    @GetMapping(value = "forsideVær/{sted}")
    private List<VaerDataResponsDTO> HentVaeretIdag(@PathVariable String sted){
        return vaerService.HentVaeretIdag(sted);
    }




}
