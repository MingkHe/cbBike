package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.BikeDelta;
import com.mycompany.myapp.repository.BikeDeltaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.BikeDelta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BikeDeltaResource {

    private final Logger log = LoggerFactory.getLogger(BikeDeltaResource.class);

    private static final String ENTITY_NAME = "bikeDelta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BikeDeltaRepository bikeDeltaRepository;

    public BikeDeltaResource(BikeDeltaRepository bikeDeltaRepository) {
        this.bikeDeltaRepository = bikeDeltaRepository;
    }

    /**
     * {@code POST  /bike-deltas} : Create a new bikeDelta.
     *
     * @param bikeDelta the bikeDelta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bikeDelta, or with status {@code 400 (Bad Request)} if the bikeDelta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bike-deltas")
    public ResponseEntity<BikeDelta> createBikeDelta(@RequestBody BikeDelta bikeDelta) throws URISyntaxException {
        log.debug("REST request to save BikeDelta : {}", bikeDelta);
        if (bikeDelta.getId() != null) {
            throw new BadRequestAlertException("A new bikeDelta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BikeDelta result = bikeDeltaRepository.save(bikeDelta);
        return ResponseEntity.created(new URI("/api/bike-deltas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bike-deltas} : Updates an existing bikeDelta.
     *
     * @param bikeDelta the bikeDelta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bikeDelta,
     * or with status {@code 400 (Bad Request)} if the bikeDelta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bikeDelta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bike-deltas")
    public ResponseEntity<BikeDelta> updateBikeDelta(@RequestBody BikeDelta bikeDelta) throws URISyntaxException {
        log.debug("REST request to update BikeDelta : {}", bikeDelta);
        if (bikeDelta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BikeDelta result = bikeDeltaRepository.save(bikeDelta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bikeDelta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bike-deltas} : get all the bikeDeltas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bikeDeltas in body.
     */
    @GetMapping("/bike-deltas")
    public List<BikeDelta> getAllBikeDeltas() {
        log.debug("REST request to get all BikeDeltas");
        return bikeDeltaRepository.findAll();
    }

    /**
     * {@code GET  /bike-deltas/:id} : get the "id" bikeDelta.
     *
     * @param id the id of the bikeDelta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bikeDelta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bike-deltas/{id}")
    public ResponseEntity<BikeDelta> getBikeDelta(@PathVariable Long id) {
        log.debug("REST request to get BikeDelta : {}", id);
        Optional<BikeDelta> bikeDelta = bikeDeltaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bikeDelta);
    }

    /**
     * {@code DELETE  /bike-deltas/:id} : delete the "id" bikeDelta.
     *
     * @param id the id of the bikeDelta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bike-deltas/{id}")
    public ResponseEntity<Void> deleteBikeDelta(@PathVariable Long id) {
        log.debug("REST request to delete BikeDelta : {}", id);
        bikeDeltaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
