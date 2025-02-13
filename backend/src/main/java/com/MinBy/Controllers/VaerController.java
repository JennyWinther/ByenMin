package com.MinBy.Controllers;

import com.MinBy.Servicer.VaerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vaeret/")
@CrossOrigin
public class VaerController {

    @Autowired
    VaerService vaerService;

    @GetMapping(value = "forsideVær")





}
