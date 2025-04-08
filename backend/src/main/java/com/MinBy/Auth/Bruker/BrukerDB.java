package com.MinBy.Auth.Bruker;

import jakarta.persistence.*;

// For å parse bruker som ligger i DB.

@Entity
@Table(name = "User")
public class BrukerDB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private Type type;
    @Column(name = "username")
    private String brukernavn;
    @Column(name = "password", nullable = false)
    private String passord;
    @Column(name = "email")
    private String email;
    @Column(name = "roles")
    @Enumerated(EnumType.STRING)
    private Roller roller;
    @Column(name = "hjemkommune")
    private String hjemkommune;

    // Constructors
    public BrukerDB() {
    }

    public BrukerDB(Type type, String brukernavn, String passord, String email) {
        this.type = type;
        this.brukernavn = brukernavn;
        this.passord = passord;
        this.email = email;
        this.roller = Roller.ROLE_USER;
    }

    public BrukerDB(Type type, String brukernavn, String passord, String email, Roller roller) {
        this.type = type;
        this.brukernavn = brukernavn;
        this.passord = passord;
        this.email = email;
        this.roller = roller;
    }

    //Getters/setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getPassord() {
        return passord;
    }

    public void setPassord(String passord) {
        this.passord = passord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Roller getRoller() {
        return roller;
    }

    public void setRoller(Roller roller) {
        this.roller = roller;
    }

    public String getHjemkommune() {
        return hjemkommune;
    }

    public void setHjemkommune(String hjemkommune) {
        this.hjemkommune = hjemkommune;
    }

    @Override
    public String toString() {
        return "Bruker{" +
                "id=" + id +
                ", brukernavn='" + brukernavn + '\'' +
                ", passord='" + passord + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + roller +
                '}';
    }
}
