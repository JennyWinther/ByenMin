package com.MinBy.DTOs;

import com.MinBy.Entiteter.Vaer.DetaljKlasser.VaerOppsummering;

public class VaerDataResponsDTO {

    // Denne klassen representerer objektet som sendes til frontend,
    // som blir satt sammen i Service.

    private String tidspunkt;
    private double luftTemperatur;
    private double vindHastighet;
    private VaerOppsummering nedbor;
    private String vaerSymbol;

    public VaerDataResponsDTO(String tidspunkt, double luftTemperatur, double vindHastighet, VaerOppsummering nedbor, String vaerSymbol) {
        this.tidspunkt = tidspunkt;
        this.luftTemperatur = luftTemperatur;
        this.vindHastighet = vindHastighet;
        this.nedbor = nedbor;
        this.vaerSymbol = vaerSymbol;
    }

    public String getTidspunkt() {
        return tidspunkt;
    }

    public void setTidspunkt(String tidspunkt) {
        this.tidspunkt = tidspunkt;
    }

    public double getLuftTemperatur() {
        return luftTemperatur;
    }

    public void setLuftTemperatur(double luftTemperatur) {
        this.luftTemperatur = luftTemperatur;
    }

    public double getVindHastighet() {
        return vindHastighet;
    }

    public void setVindHastighet(double vindHastighet) {
        this.vindHastighet = vindHastighet;
    }

    public VaerOppsummering getNedbor() {
        return nedbor;
    }

    public void setNedbor(VaerOppsummering nedbor) {
        this.nedbor = nedbor;
    }

    public String getVaerSymbol() {
        return vaerSymbol;
    }

    public void setVaerSymbol(String vaerSymbol) {
        this.vaerSymbol = vaerSymbol;
    }
}
