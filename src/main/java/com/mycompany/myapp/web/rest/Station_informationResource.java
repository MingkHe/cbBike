package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Station_information;
import com.mycompany.myapp.repository.Station_informationRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Station_information}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Station_informationResource {

    private final Logger log = LoggerFactory.getLogger(Station_informationResource.class);

    private static final String ENTITY_NAME = "station_information";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Station_informationRepository station_informationRepository;

    public Station_informationResource(Station_informationRepository station_informationRepository) {
        this.station_informationRepository = station_informationRepository;
    }

    /**
     * {@code POST  /station-informations} : Create a new station_information.
     *
     * @param station_information the station_information to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new station_information, or with status {@code 400 (Bad Request)} if the station_information has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/station-informations")
    public ResponseEntity<Station_information> createStation_information(@RequestBody Station_information station_information) throws URISyntaxException {
        log.debug("REST request to save Station_information : {}", station_information);
        if (station_information.getId() != null) {
            throw new BadRequestAlertException("A new station_information cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Station_information result = station_informationRepository.save(station_information);
        return ResponseEntity.created(new URI("/api/station-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /station-informations} : Updates an existing station_information.
     *
     * @param station_information the station_information to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated station_information,
     * or with status {@code 400 (Bad Request)} if the station_information is not valid,
     * or with status {@code 500 (Internal Server Error)} if the station_information couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/station-informations")
    public ResponseEntity<Station_information> updateStation_information(@RequestBody Station_information station_information) throws URISyntaxException {
        log.debug("REST request to update Station_information : {}", station_information);
        if (station_information.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Station_information result = station_informationRepository.save(station_information);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, station_information.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /station-informations} : get all the station_informations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of station_informations in body.
     */
    @GetMapping("/station-informations")
    public List<Station_information> getAllStation_informations() {
        log.debug("REST request to get all Station_informations");
        return station_informationRepository.findAll();
    }

    /**
     * {@code GET  /station-informations/:id} : get the "id" station_information.
     *
     * @param id the id of the station_information to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the station_information, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/station-informations/{id}")
    public ResponseEntity<Station_information> getStation_information(@PathVariable Long id) {
        log.debug("REST request to get Station_information : {}", id);
        Optional<Station_information> station_information = station_informationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(station_information);
    }

    /**
     * {@code DELETE  /station-informations/:id} : delete the "id" station_information.
     *
     * @param id the id of the station_information to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/station-informations/{id}")
    public ResponseEntity<Void> deleteStation_information(@PathVariable Long id) {
        log.debug("REST request to delete Station_information : {}", id);
        station_informationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
