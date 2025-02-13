package com.MinBy.Entiteter.Vaer;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Embeddable
public class VaerData {

    // Nest ytterste wrapping.

    @Id
    private String time;

    @Embedded
    private VaerDataDetaljer data;

    public VaerData() {
    }

    public VaerData(String time, VaerDataDetaljer data) {
        this.time = time;
        this.data = data;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public VaerDataDetaljer getData() {
        return data;
    }

    public void setData(VaerDataDetaljer data) {
        this.data = data;
    }
}
