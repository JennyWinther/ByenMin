package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.MinBy.Entiteter.Vær.Timeseries;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Properties {

    @JsonProperty("timeseries")
    private List<Timeseries> timeseries;

    public Properties() {}

    public List<Timeseries> getTimeseries() {
        return timeseries;
    }

    public void setTimeseries(List<Timeseries> timeseries) {
        this.timeseries = timeseries;
    }
}
