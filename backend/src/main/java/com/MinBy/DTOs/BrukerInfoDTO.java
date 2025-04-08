package com.MinBy.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;

public class BrukerInfoDTO {
    @JsonProperty("brukernavn")
    private String brukernavn;
    @JsonProperty("email")
    private String email;

    @JsonProperty("hjemkommune")
    private String hjemkommune;

    public BrukerInfoDTO() {
    }

    public BrukerInfoDTO(String brukernavn, String email, String hjemkommune) {
        this.brukernavn = brukernavn;
        this.email = email;
        this.hjemkommune = hjemkommune;
    }

    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHjemkommune() {
        return hjemkommune;
    }

    public void setHjemkommune(String hjemkommune) {
        this.hjemkommune = hjemkommune;
    }
}
