package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Station;
import com.mycompany.myapp.repository.StationRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Station}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StationResource {

    private final Logger log = LoggerFactory.getLogger(StationResource.class);

    private static final String ENTITY_NAME = "station";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StationRepository stationRepository;

    public StationResource(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    /**
     * {@code POST  /stations} : Create a new station.
     *
     * @param station the station to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new station, or with status {@code 400 (Bad Request)} if the station has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stations")
    public ResponseEntity<Station> createStation(@RequestBody Station station) throws URISyntaxException {
        log.debug("REST request to save Station : {}", station);
        if (station.getId() != null) {
            throw new BadRequestAlertException("A new station cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Station result = stationRepository.save(station);
        return ResponseEntity.created(new URI("/api/stations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stations} : Updates an existing station.
     *
     * @param station the station to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated station,
     * or with status {@code 400 (Bad Request)} if the station is not valid,
     * or with status {@code 500 (Internal Server Error)} if the station couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stations")
    public ResponseEntity<Station> updateStation(@RequestBody Station station) throws URISyntaxException {
        log.debug("REST request to update Station : {}", station);
        if (station.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Station result = stationRepository.save(station);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, station.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stations} : get all the stations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stations in body.
     */
    @GetMapping("/stations")
    public List<Station> getAllStations() {
        log.debug("REST request to get all Stations");
        return stationRepository.findAll();
    }

    /**
     * {@code GET  /stations/:id} : get the "id" station.
     *
     * @param id the id of the station to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the station, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stations/{id}")
    public ResponseEntity<Station> getStation(@PathVariable Long id) {
        log.debug("REST request to get Station : {}", id);
        Optional<Station> station = stationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(station);
    }

    /**
     * {@code DELETE  /stations/:id} : delete the "id" station.
     *
     * @param id the id of the station to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stations/{id}")
    public ResponseEntity<Void> deleteStation(@PathVariable Long id) {
        log.debug("REST request to delete Station : {}", id);
        stationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/stationsIdByName/{name}")
    public ResponseEntity<Station> getStationIdByName(@PathVariable String name) {
        log.debug("REST request to get Station : {}", name);
        Optional<Station> station = stationRepository.findStationByName(name);
        return ResponseUtil.wrapOrNotFound(station);
    }
}
