package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Oppsummering {

    // Referanse til JSON: timeseries.data.nextXXhours.summary.
    // Inneholder informasjon for symbolbruk (fint/dårlig vær, sikkerhet i varsling)

    @JsonProperty("symbol_code")
    private String symbolCode;

    @JsonProperty("symbol_confidence")
    private String symbolConfidence;

    public Oppsummering() {
    }

    public Oppsummering(String symbolCode, String symbolConfidence) {
        this.symbolCode = symbolCode;
        this.symbolConfidence = symbolConfidence;
    }

    public String getSymbolCode() {
        return symbolCode;
    }

    public void setSymbolCode(String symbolCode) {
        this.symbolCode = symbolCode;
    }

    public String getSymbolConfidence() {
        return symbolConfidence;
    }

    public void setSymbolConfidence(String symbolConfidence) {
        this.symbolConfidence = symbolConfidence;
    }
}
