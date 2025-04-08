package com.MinBy.Entiteter.Vær;

import com.MinBy.Entiteter.Vær.DetaljKlasser.InstantWrapper;
import com.MinBy.Entiteter.Vær.DetaljKlasser.Fremtidsvarsel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TimeseriesData {

    // Data inni en Timeseries, hovedsakelig Instant, men også varsel for fremtidige timer.
    // OBS: Ikke alltid disse neste timene følger med for lengre i fremtiden enn en dag eller to.

    @JsonProperty("instant")
    private InstantWrapper instant;

    @JsonProperty("next_1_hours")
    private Fremtidsvarsel next1Hours;

    @JsonProperty("next_6_hours")
    private Fremtidsvarsel next6Hours;

    @JsonProperty("next_12_hours")
    private Fremtidsvarsel next12Hours;

    public TimeseriesData() {
    }

    public TimeseriesData(InstantWrapper instant, Fremtidsvarsel next1Hours, Fremtidsvarsel next6Hours, Fremtidsvarsel next12Hours) {
        this.instant = instant;
        this.next1Hours = next1Hours;
        this.next6Hours = next6Hours;
        this.next12Hours = next12Hours;
    }

    public InstantWrapper getInstant() {
        return instant;
    }

    public void setInstant(InstantWrapper instant) {
        this.instant = instant;
    }

    public Fremtidsvarsel getNext1Hours() {
        return next1Hours;
    }

    public void setNext1Hours(Fremtidsvarsel next1Hours) {
        this.next1Hours = next1Hours;
    }

    public Fremtidsvarsel getNext6Hours() {
        return next6Hours;
    }

    public void setNext6Hours(Fremtidsvarsel next6Hours) {
        this.next6Hours = next6Hours;
    }

    public Fremtidsvarsel getNext12Hours() {
        return next12Hours;
    }

    public void setNext12Hours(Fremtidsvarsel next12Hours) {
        this.next12Hours = next12Hours;
    }
}


