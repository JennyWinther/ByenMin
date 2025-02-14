package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Detaljer {

    // Detaljer som finnes inni timeseries.data.nextXXhours.details.

    @JsonProperty("precipitation_amount")
    private double nedbørsmengde;

    public Detaljer() {
    }

    public double getNedbørsmengde() {
        return nedbørsmengde;
    }

    public void setNedbørsmengde(double nedbørsmengde) {
        this.nedbørsmengde = nedbørsmengde;
    }

}
