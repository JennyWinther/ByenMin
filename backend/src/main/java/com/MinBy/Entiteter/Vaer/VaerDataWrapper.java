package com.MinBy.Entiteter.Vaer;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

import java.util.List;
@Embeddable
public class VaerDataWrapper {

    //Ytterste lag av JSON wrapping.

    private List<VaerData> timeseries;

    public VaerDataWrapper() {
    }

    public VaerDataWrapper(List<VaerData> timeseries) {
        this.timeseries = timeseries;
    };
    @ElementCollection
    public List<VaerData> getTimeseries() {
        return timeseries;
    }

    public void setTimeseries(List<VaerData> timeseries) {
        this.timeseries = timeseries;
    }
}
