package com.MinBy.Entiteter.Vær;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

public class Timeseries {

    // Nest ytterste wrapping, inneholder alle Timeseries (data per klokkeslett/dato)

    @Id
    private String time;

    private TimeseriesData data;

    public Timeseries() {
    }

    public Timeseries(String time, TimeseriesData data) {
        this.time = time;
        this.data = data;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public TimeseriesData getData() {
        return data;
    }

    public void setData(TimeseriesData data) {
        this.data = data;
    }
}
