package com.MinBy.Entiteter.GeoapifySted;
import java.util.List;

public class StedsinformasjonWrapper {

    // Wrapperklasse for GeoKommune entitet.

    private List<Stedsinformasjon> results;

    public List<Stedsinformasjon> getResults() {
        return results;
    }

    public void setResults(List<Stedsinformasjon> results) {
        this.results = results;
    }
}
