package com.MinBy.Entiteter.GeoapifySted;

import jakarta.persistence.Id;

public class Stedsinformasjon {

    // Denne klassen inneholder resultatinformasjon fra Geoapify (Se VaerService)
    // Det viktigste her er Latitude og Longitude (lat/lon), da dette må videre til api.met.no.

    private String place_id;
    private String county;
    private String city;
    private Double lat;
    private Double lon;

    public Stedsinformasjon() {
    }

    public Stedsinformasjon(String place_id, String county, String city, Double lat, Double lon) {
        this.place_id = place_id;
        this.county = county;
        this.city = city;
        this.lat = lat;
        this.lon = lon;
    }

    public String getPlace_id() {
        return place_id;
    }

    public void setPlace_id(String place_id) {
        this.place_id = place_id;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

}
