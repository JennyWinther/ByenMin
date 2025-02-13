package com.MinBy.Entiteter.Vaer.DetaljKlasser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;

@Embeddable
@JsonIgnoreProperties(ignoreUnknown = true)
public class NaaværendeVaerDetaljer {

    // En referanse til JSON: timeseries.data.instant, som inneholder generell
    // informasjon som luftfuktighet og temperatur.
    @JsonProperty("air_temperature")
    private double airTemperature;

    @JsonProperty("relative_humidity")
    private double relativeHumidity;

    @JsonProperty("wind_speed")
    private double windSpeed;

    @JsonProperty("wind_from_direction")
    private double windFromDirection;

    public NaaværendeVaerDetaljer() {
    }

    public NaaværendeVaerDetaljer(double airTemperature, double relativeHumidity, double windSpeed, double windFromDirection) {
        this.airTemperature = airTemperature;
        this.relativeHumidity = relativeHumidity;
        this.windSpeed = windSpeed;
        this.windFromDirection = windFromDirection;
    }

    public double getAirTemperature() {
        return airTemperature;
    }

    public void setAirTemperature(double airTemperature) {
        this.airTemperature = airTemperature;
    }

    public double getRelativeHumidity() {
        return relativeHumidity;
    }

    public void setRelativeHumidity(double relativeHumidity) {
        this.relativeHumidity = relativeHumidity;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public double getWindFromDirection() {
        return windFromDirection;
    }

    public void setWindFromDirection(double windFromDirection) {
        this.windFromDirection = windFromDirection;
    }
}
