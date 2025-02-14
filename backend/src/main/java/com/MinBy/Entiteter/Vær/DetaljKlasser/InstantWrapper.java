package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InstantWrapper {

    // En referanse til JSON: timeseries.data.instant, som inneholder generell
    // informasjon som luftfuktighet og temperatur.
    @JsonProperty("details")
    private InstantDetaljer detaljer;

    public InstantWrapper() {
    }

    public InstantWrapper(InstantDetaljer detaljer) {
        this.detaljer = detaljer;
    }

    public InstantDetaljer getDetaljer() {
        return detaljer;
    }

    public void setDetaljer(InstantDetaljer detaljer) {
        this.detaljer = detaljer;
    }
}
