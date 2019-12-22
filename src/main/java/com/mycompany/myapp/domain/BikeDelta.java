package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A BikeDelta.
 */
@Entity
@Table(name = "bike_delta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BikeDelta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "station_id")
    private Integer stationID;

    @Column(name = "minute")
    private Integer minute;

    @Column(name = "weekday")
    private Boolean weekday;

    @Column(name = "delta_value")
    private Double deltaValue;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStationID() {
        return stationID;
    }

    public BikeDelta stationID(Integer stationID) {
        this.stationID = stationID;
        return this;
    }

    public void setStationID(Integer stationID) {
        this.stationID = stationID;
    }

    public Integer getMinute() {
        return minute;
    }

    public BikeDelta minute(Integer minute) {
        this.minute = minute;
        return this;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Boolean isWeekday() {
        return weekday;
    }

    public BikeDelta weekday(Boolean weekday) {
        this.weekday = weekday;
        return this;
    }

    public void setWeekday(Boolean weekday) {
        this.weekday = weekday;
    }

    public Double getDeltaValue() {
        return deltaValue;
    }

    public BikeDelta deltaValue(Double deltaValue) {
        this.deltaValue = deltaValue;
        return this;
    }

    public void setDeltaValue(Double deltaValue) {
        this.deltaValue = deltaValue;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BikeDelta)) {
            return false;
        }
        return id != null && id.equals(((BikeDelta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BikeDelta{" +
            "id=" + getId() +
            ", stationID=" + getStationID() +
            ", minute=" + getMinute() +
            ", weekday='" + isWeekday() + "'" +
            ", deltaValue=" + getDeltaValue() +
            "}";
    }
}
