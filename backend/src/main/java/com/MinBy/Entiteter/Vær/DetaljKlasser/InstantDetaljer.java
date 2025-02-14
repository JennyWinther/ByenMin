package com.MinBy.Entiteter.Vær.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InstantDetaljer {

    //De detaljene som finnes inni timeseries.data.instant.details.

    @JsonProperty("air_pressure_at_sea_level")
    private double lufttrykkHavnivå;

    @JsonProperty("air_temperature")
    private double luftTemperatur;

    @JsonProperty("cloud_area_fraction")
    private double skydekke;

    @JsonProperty("relative_humidity")
    private double relativFuktighet;

    @JsonProperty("wind_from_direction")
    private double retningVind;

    @JsonProperty("wind_speed")
    private double hastighetVind;

    public InstantDetaljer() {
    }

    public InstantDetaljer(double lufttrykkHavnivå,
                           double luftTemperatur,
                           double skydekke,
                           double relativFuktighet,
                           double retningVind,
                           double hastighetVind) {
        this.lufttrykkHavnivå = lufttrykkHavnivå;
        this.luftTemperatur = luftTemperatur;
        this.skydekke = skydekke;
        this.relativFuktighet = relativFuktighet;
        this.retningVind = retningVind;
        this.hastighetVind = hastighetVind;
    }

    public double getLufttrykkHavnivå() {
        return lufttrykkHavnivå;
    }

    public void setLufttrykkHavnivå(double lufttrykkHavnivå) {
        this.lufttrykkHavnivå = lufttrykkHavnivå;
    }

    public double getLuftTemperatur() {
        return luftTemperatur;
    }

    public void setLuftTemperatur(double luftTemperatur) {
        this.luftTemperatur = luftTemperatur;
    }

    public double getSkydekke() {
        return skydekke;
    }

    public void setSkydekke(double skydekke) {
        this.skydekke = skydekke;
    }

    public double getRelativFuktighet() {
        return relativFuktighet;
    }

    public void setRelativFuktighet(double relativFuktighet) {
        this.relativFuktighet = relativFuktighet;
    }

    public double getRetningVind() {
        return retningVind;
    }

    public void setRetningVind(double retningVind) {
        this.retningVind = retningVind;
    }

    public double getHastighetVind() {
        return hastighetVind;
    }

    public void setHastighetVind(double hastighetVind) {
        this.hastighetVind = hastighetVind;
    }
}
