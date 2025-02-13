package com.MinBy.Entiteter.Vaer;

import com.MinBy.Entiteter.Vaer.DetaljKlasser.NaverendeVaerDetaljer;
import com.MinBy.Entiteter.Vaer.DetaljKlasser.VaerVarsel;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
@JsonIgnoreProperties(ignoreUnknown = true)
public class VaerDataDetaljer {

    // Innerste lag av Vær-entitet.

    @JsonProperty("instant")
    private NaverendeVaerDetaljer instant;

    @JsonProperty("next_1_hours")
    private VaerVarsel next1Hours;

    @JsonProperty("next_6_hours")
    private VaerVarsel next6Hours;

    @JsonProperty("next_12_hours")
    private VaerVarsel next12Hours;

    public VaerDataDetaljer() {
    }

    public VaerDataDetaljer(NaverendeVaerDetaljer instant, VaerVarsel next1Hours, VaerVarsel next6Hours, VaerVarsel next12Hours) {
        this.instant = instant;
        this.next1Hours = next1Hours;
        this.next6Hours = next6Hours;
        this.next12Hours = next12Hours;
    }

    @Embedded
    public NaverendeVaerDetaljer getInstant() {
        return instant;
    }

    public void setInstant(NaverendeVaerDetaljer instant) {
        this.instant = instant;
    }

    public VaerVarsel getNext1Hours() {
        return next1Hours;
    }

    public void setNext1Hours(VaerVarsel next1Hours) {
        this.next1Hours = next1Hours;
    }

    public VaerVarsel getNext6Hours() {
        return next6Hours;
    }

    public void setNext6Hours(VaerVarsel next6Hours) {
        this.next6Hours = next6Hours;
    }

    public VaerVarsel getNext12Hours() {
        return next12Hours;
    }

    public void setNext12Hours(VaerVarsel next12Hours) {
        this.next12Hours = next12Hours;
    }
}
