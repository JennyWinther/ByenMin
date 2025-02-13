package com.MinBy.Entiteter.Vaer.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
@JsonIgnoreProperties(ignoreUnknown = true)
public class VaerVarsel {

    // Referanse til intern wrapper: timeseries.data.nextXXhours.
    // Inneholder oppsummering (Se VaerOppsummering entitet) og sjanse for regn/torden, evt mengde.

    @JsonProperty("summary")
    private VaerOppsummering summary;

    @JsonProperty("details")
    private VaerOppsummering details;

    public VaerVarsel() {
    }

    public VaerVarsel(VaerOppsummering summary, VaerOppsummering details) {
        this.summary = summary;
        this.details = details;
    }

    @Embedded
    public VaerOppsummering getSummary() {
        return summary;
    }

    public void setSummary(VaerOppsummering summary) {
        this.summary = summary;
    }

    @Embedded
    public VaerOppsummering getDetails() {
        return details;
    }

    public void setDetails(VaerOppsummering details) {
        this.details = details;
    }
}
