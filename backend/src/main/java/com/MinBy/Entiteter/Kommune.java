package com.MinBy.Entiteter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Kommune {
    @Id
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
