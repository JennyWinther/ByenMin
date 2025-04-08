package com.MinBy.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Optional;

// For parsing av JSON objekt fra front-end.

public class BrukerDTO {
    @JsonProperty("brukernavn")
    private String brukernavn;
    @JsonProperty("email")
    private String email;
    @JsonProperty("passord")
    private String passord;

    @JsonProperty("hjemkommune")
    private Optional<String> hjemkommune;

    // Constructors
    public BrukerDTO() {
    }

    public BrukerDTO(String brukernavn, String passord, String email) {
        this.brukernavn = brukernavn;
        this.email = email;
        this.passord = passord;
    }

    //Getters/setters
    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getPassord() {
        return passord;
    }

    public void setPassord(String passord) {
        this.passord = passord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Optional<String> getHjemkommune() {
        return hjemkommune;
    }

    public void setHjemkommune(Optional<String> hjemkommune) {
        this.hjemkommune = hjemkommune;
    }
}
