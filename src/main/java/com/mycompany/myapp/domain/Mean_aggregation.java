package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Mean_aggregation.
 */
@Entity
@Table(name = "mean_aggregation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mean_aggregation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "station_id")
    private Integer stationID;

    @Column(name = "is_weekday")
    private Boolean isWeekday;

    @Column(name = "minute")
    private Integer minute;

    @Column(name = "delta")
    private Double delta;

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

    public Mean_aggregation stationID(Integer stationID) {
        this.stationID = stationID;
        return this;
    }

    public void setStationID(Integer stationID) {
        this.stationID = stationID;
    }

    public Boolean isIsWeekday() {
        return isWeekday;
    }

    public Mean_aggregation isWeekday(Boolean isWeekday) {
        this.isWeekday = isWeekday;
        return this;
    }

    public void setIsWeekday(Boolean isWeekday) {
        this.isWeekday = isWeekday;
    }

    public Integer getMinute() {
        return minute;
    }

    public Mean_aggregation minute(Integer minute) {
        this.minute = minute;
        return this;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Double getDelta() {
        return delta;
    }

    public Mean_aggregation delta(Double delta) {
        this.delta = delta;
        return this;
    }

    public void setDelta(Double delta) {
        this.delta = delta;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mean_aggregation)) {
            return false;
        }
        return id != null && id.equals(((Mean_aggregation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Mean_aggregation{" +
            "id=" + getId() +
            ", stationID=" + getStationID() +
            ", isWeekday='" + isIsWeekday() + "'" +
            ", minute=" + getMinute() +
            ", delta=" + getDelta() +
            "}";
    }
}
