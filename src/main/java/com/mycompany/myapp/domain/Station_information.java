package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Station_information.
 */
@Entity
@Table(name = "station_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Station_information implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "station_id")
    private Integer station_id;

    @Column(name = "external_id")
    private String external_id;

    @Column(name = "name")
    private String name;

    @Column(name = "short_name")
    private Double short_name;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @Column(name = "region_id")
    private Integer region_id;

    @Column(name = "rental_methods_0")
    private String rental_methods_0;

    @Column(name = "rental_methods_1")
    private String rental_methods_1;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "rental_url")
    private String rental_url;

    @Column(name = "electric_bike_surcharge_waiver")
    private String electric_bike_surcharge_waiver;

    @Column(name = "eightd_has_key_dispenser")
    private String eightd_has_key_dispenser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStation_id() {
        return station_id;
    }

    public Station_information station_id(Integer station_id) {
        this.station_id = station_id;
        return this;
    }

    public void setStation_id(Integer station_id) {
        this.station_id = station_id;
    }

    public String getExternal_id() {
        return external_id;
    }

    public Station_information external_id(String external_id) {
        this.external_id = external_id;
        return this;
    }

    public void setExternal_id(String external_id) {
        this.external_id = external_id;
    }

    public String getName() {
        return name;
    }

    public Station_information name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getShort_name() {
        return short_name;
    }

    public Station_information short_name(Double short_name) {
        this.short_name = short_name;
        return this;
    }

    public void setShort_name(Double short_name) {
        this.short_name = short_name;
    }

    public Double getLat() {
        return lat;
    }

    public Station_information lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public Station_information lon(Double lon) {
        this.lon = lon;
        return this;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Integer getRegion_id() {
        return region_id;
    }

    public Station_information region_id(Integer region_id) {
        this.region_id = region_id;
        return this;
    }

    public void setRegion_id(Integer region_id) {
        this.region_id = region_id;
    }

    public String getRental_methods_0() {
        return rental_methods_0;
    }

    public Station_information rental_methods_0(String rental_methods_0) {
        this.rental_methods_0 = rental_methods_0;
        return this;
    }

    public void setRental_methods_0(String rental_methods_0) {
        this.rental_methods_0 = rental_methods_0;
    }

    public String getRental_methods_1() {
        return rental_methods_1;
    }

    public Station_information rental_methods_1(String rental_methods_1) {
        this.rental_methods_1 = rental_methods_1;
        return this;
    }

    public void setRental_methods_1(String rental_methods_1) {
        this.rental_methods_1 = rental_methods_1;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Station_information capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getRental_url() {
        return rental_url;
    }

    public Station_information rental_url(String rental_url) {
        this.rental_url = rental_url;
        return this;
    }

    public void setRental_url(String rental_url) {
        this.rental_url = rental_url;
    }

    public String getElectric_bike_surcharge_waiver() {
        return electric_bike_surcharge_waiver;
    }

    public Station_information electric_bike_surcharge_waiver(String electric_bike_surcharge_waiver) {
        this.electric_bike_surcharge_waiver = electric_bike_surcharge_waiver;
        return this;
    }

    public void setElectric_bike_surcharge_waiver(String electric_bike_surcharge_waiver) {
        this.electric_bike_surcharge_waiver = electric_bike_surcharge_waiver;
    }

    public String getEightd_has_key_dispenser() {
        return eightd_has_key_dispenser;
    }

    public Station_information eightd_has_key_dispenser(String eightd_has_key_dispenser) {
        this.eightd_has_key_dispenser = eightd_has_key_dispenser;
        return this;
    }

    public void setEightd_has_key_dispenser(String eightd_has_key_dispenser) {
        this.eightd_has_key_dispenser = eightd_has_key_dispenser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Station_information)) {
            return false;
        }
        return id != null && id.equals(((Station_information) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Station_information{" +
            "id=" + getId() +
            ", station_id=" + getStation_id() +
            ", external_id='" + getExternal_id() + "'" +
            ", name='" + getName() + "'" +
            ", short_name=" + getShort_name() +
            ", lat=" + getLat() +
            ", lon=" + getLon() +
            ", region_id=" + getRegion_id() +
            ", rental_methods_0='" + getRental_methods_0() + "'" +
            ", rental_methods_1='" + getRental_methods_1() + "'" +
            ", capacity=" + getCapacity() +
            ", rental_url='" + getRental_url() + "'" +
            ", electric_bike_surcharge_waiver='" + getElectric_bike_surcharge_waiver() + "'" +
            ", eightd_has_key_dispenser='" + getEightd_has_key_dispenser() + "'" +
            "}";
    }
}
