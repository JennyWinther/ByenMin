package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Fremtidsvarsel {

    // Referanse til intern wrapper: timeseries.data.nextXXhours.
    // Inneholder oppsummering (Se VaerOppsummering entitet) og sjanse for regn/torden, evt mengde.

    @JsonProperty("summary")
    private Oppsummering summary;

    @JsonProperty("details")
    private Detaljer details;

    public Fremtidsvarsel() {
    }

    public Fremtidsvarsel(Oppsummering summary, Detaljer details) {
        this.summary = summary;
        this.details = details;
    }

    public Oppsummering getSummary() {
        return summary;
    }

    public void setSummary(Oppsummering summary) {
        this.summary = summary;
    }

    public Detaljer getDetails() {
        return details;
    }

    public void setDetails(Detaljer details) {
        this.details = details;
    }
}
