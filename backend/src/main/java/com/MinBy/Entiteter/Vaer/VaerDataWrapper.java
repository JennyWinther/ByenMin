package com.MinBy.Entiteter.Vaer;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;

import java.util.List;
@Embeddable
public class VaerDataWrapper {

    //Ytterste lag av JSON wrapping.

    private List<VaerDataDetaljer> timeseries;

    public VaerDataWrapper() {
    }

    public VaerDataWrapper(List<VaerDataDetaljer> timeseries) {
        this.timeseries = timeseries;
    }

    @ElementCollection
    public List<VaerDataDetaljer> getTimeseries() {
        return timeseries;
    }

    public void setTimeseries(List<VaerDataDetaljer> timeseries) {
        this.timeseries = timeseries;
    }
}
