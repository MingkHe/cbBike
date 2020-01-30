package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Mean_aggregation;
import com.mycompany.myapp.repository.Mean_aggregationRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Mean_aggregation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Mean_aggregationResource {

    private final Logger log = LoggerFactory.getLogger(Mean_aggregationResource.class);

    private static final String ENTITY_NAME = "mean_aggregation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Mean_aggregationRepository mean_aggregationRepository;

    public Mean_aggregationResource(Mean_aggregationRepository mean_aggregationRepository) {
        this.mean_aggregationRepository = mean_aggregationRepository;
    }

    /**
     * {@code POST  /mean-aggregations} : Create a new mean_aggregation.
     *
     * @param mean_aggregation the mean_aggregation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mean_aggregation, or with status {@code 400 (Bad Request)} if the mean_aggregation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mean-aggregations")
    public ResponseEntity<Mean_aggregation> createMean_aggregation(@RequestBody Mean_aggregation mean_aggregation) throws URISyntaxException {
        log.debug("REST request to save Mean_aggregation : {}", mean_aggregation);
        if (mean_aggregation.getId() != null) {
            throw new BadRequestAlertException("A new mean_aggregation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mean_aggregation result = mean_aggregationRepository.save(mean_aggregation);
        return ResponseEntity.created(new URI("/api/mean-aggregations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mean-aggregations} : Updates an existing mean_aggregation.
     *
     * @param mean_aggregation the mean_aggregation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mean_aggregation,
     * or with status {@code 400 (Bad Request)} if the mean_aggregation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mean_aggregation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mean-aggregations")
    public ResponseEntity<Mean_aggregation> updateMean_aggregation(@RequestBody Mean_aggregation mean_aggregation) throws URISyntaxException {
        log.debug("REST request to update Mean_aggregation : {}", mean_aggregation);
        if (mean_aggregation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mean_aggregation result = mean_aggregationRepository.save(mean_aggregation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, mean_aggregation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mean-aggregations} : get all the mean_aggregations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mean_aggregations in body.
     */
    @GetMapping("/mean-aggregations")
    public List<Mean_aggregation> getAllMean_aggregations() {
        log.debug("REST request to get all Mean_aggregations");
        return mean_aggregationRepository.findAll();
    }

    /**
     * {@code GET  /mean-aggregations/:id} : get the "id" mean_aggregation.
     *
     * @param id the id of the mean_aggregation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mean_aggregation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mean-aggregations/{id}")
    public ResponseEntity<Mean_aggregation> getMean_aggregation(@PathVariable Long id) {
        log.debug("REST request to get Mean_aggregation : {}", id);
        Optional<Mean_aggregation> mean_aggregation = mean_aggregationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mean_aggregation);
    }

    @GetMapping("/mean-aggregations/{sid}/{minute}/{weekday}")
    public ResponseEntity<Mean_aggregation> getMean_aggregationBySidAndWeekdayAndMinute(@PathVariable Integer sid, @PathVariable Integer minute, @PathVariable Boolean weekday) {
        log.debug("REST request to get Mean_aggregation by sid minute, weekday: {}", sid, minute, weekday);
        Optional<Mean_aggregation> mean_aggregation = mean_aggregationRepository.findMean_aggregationByStationIDAndMinuteAndIsWeekday(sid, minute, weekday);
        return ResponseUtil.wrapOrNotFound(mean_aggregation);
    }

    /**
     * {@code DELETE  /mean-aggregations/:id} : delete the "id" mean_aggregation.
     *
     * @param id the id of the mean_aggregation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mean-aggregations/{id}")
    public ResponseEntity<Void> deleteMean_aggregation(@PathVariable Long id) {
        log.debug("REST request to delete Mean_aggregation : {}", id);
        mean_aggregationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }


}
