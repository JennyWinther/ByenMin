package com.MinBy.Entiteter.Politi;

import jakarta.persistence.Id;

public class Kommune {

    // Kommune hentes fra Kartverket sin API. Dette er eksklusivt for å kunne hente en liste med oppdaterte
    // navn, som kan listes i søkebar i frontend.

    private String kommunenummer;
    private String kommunenavn;
    private String kommunenavnNorsk;

    public Kommune() {
    }

    public Kommune(String kommunenummer, String kommunenavn, String kommunenavnNorsk) {
        this.kommunenummer = kommunenummer;
        this.kommunenavn = kommunenavn;
        this.kommunenavnNorsk = kommunenavnNorsk;
    }

    public String getKommunenummer() {
        return kommunenummer;
    }

    public void setKommunenummer(String kommunenummer) {
        this.kommunenummer = kommunenummer;
    }

    public String getKommunenavn() {
        return kommunenavn;
    }

    public void setKommunenavn(String kommunenavn) {
        this.kommunenavn = kommunenavn;
    }

    public String getKommunenavnNorsk() {
        return kommunenavnNorsk;
    }

    public void setKommunenavnNorsk(String kommunenavnNorsk) {
        this.kommunenavnNorsk = kommunenavnNorsk;
    }
}
