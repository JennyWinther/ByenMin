package com.MinBy.Entiteter.Vaer.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;

@Embeddable
@JsonIgnoreProperties(ignoreUnknown = true)
public class VaerOppsummering {

    // Referanse til JSON: timeseries.data.nextXXhours.summary.
    // Inneholder informasjon for symbolbruk (fint/dårlig vær, sikkerhet i varsling)

    @JsonProperty("symbol_code")
    private String symbolCode;

    @JsonProperty("symbol_confidence")
    private String symbolConfidence;

    public VaerOppsummering() {
    }

    public VaerOppsummering(String symbolCode, String symbolConfidence) {
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
