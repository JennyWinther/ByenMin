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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getThreadId() {
        return threadId;
    }

    public void setThreadId(String threadId) {
        this.threadId = threadId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public OffsetDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(OffsetDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public OffsetDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(OffsetDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPreviouslyIncludedImage() {
        return previouslyIncludedImage;
    }

    public void setPreviouslyIncludedImage(String previouslyIncludedImage) {
        this.previouslyIncludedImage = previouslyIncludedImage;
    }

    public boolean isEdited() {
        return isEdited;
    }

    public void setEdited(boolean edited) {
        isEdited = edited;
    }
}
