package com.MinBy.Entiteter.Vær;

import com.MinBy.Entiteter.Vær.DetaljKlasser.Geometry;
import com.MinBy.Entiteter.Vær.DetaljKlasser.Properties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class YttersteVærWrapper {

    @JsonProperty("type")
    private String type;

    @JsonProperty("geometry")
    private Geometry geometry;

    @JsonProperty("properties")
    private Properties properties;

    public YttersteVærWrapper() {}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }
}
