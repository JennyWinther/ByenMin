package com.MinBy.Entiteter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.OffsetDateTime;

@Entity
public class Melding {
    //Entitet for politimeldinger. Basert på eksempelmelding gitt i Politiloggens API.

    @Id
    private String id;
    private String threadId;
    private String category;

    //Politidistriktet som har ansvar/responderte
    private String district;

    //fylke
    private String municipality;

    //by
    private String area;

    //Om saken enda er åpen
    private boolean isActive;

    //beskrivelse av hendelse/r, og løsning.
    private String text;

    //dato melding er opprettet
    private OffsetDateTime createdOn;

    //Om oppdatert, er dato endret fra createdOn
    private OffsetDateTime updatedOn;
    private String imageUrl;
    private String previouslyIncludedImage;

    //Om oppdatert, så true. else false
    private boolean isEdited;

    //----------------------------------------------------------------------

    //Empty constructor, as per Springboot standarder
    public Melding() {
    }


    //Fullstendig constructor
    public Melding(String id, String threadId, String category, String district,
                   String municipality, String area, boolean isActive, String text, OffsetDateTime createdOn,
                   OffsetDateTime updatedOn, String imageUrl, String previouslyIncludedImage, boolean isEdited) {
        this.id = id;
        this.threadId = threadId;
        this.category = category;
        this.district = district;
        this.municipality = municipality;
        this.area = area;
        this.isActive = isActive;
        this.text = text;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.imageUrl = imageUrl;
        this.previouslyIncludedImage = previouslyIncludedImage;
        this.isEdited = isEdited;
    }
}
