package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CbPlusApp;
import com.mycompany.myapp.domain.Mean_aggregation;
import com.mycompany.myapp.repository.Mean_aggregationRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Mean_aggregationResource} REST controller.
 */
@SpringBootTest(classes = CbPlusApp.class)
public class Mean_aggregationResourceIT {

    private static final Integer DEFAULT_STATION_ID = 1;
    private static final Integer UPDATED_STATION_ID = 2;

    private static final Boolean DEFAULT_IS_WEEKDAY = false;
    private static final Boolean UPDATED_IS_WEEKDAY = true;

    private static final Integer DEFAULT_MINUTE = 1;
    private static final Integer UPDATED_MINUTE = 2;

    private static final Double DEFAULT_DELTA = 1D;
    private static final Double UPDATED_DELTA = 2D;

    @Autowired
    private Mean_aggregationRepository mean_aggregationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMean_aggregationMockMvc;

    private Mean_aggregation mean_aggregation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Mean_aggregationResource mean_aggregationResource = new Mean_aggregationResource(mean_aggregationRepository);
        this.restMean_aggregationMockMvc = MockMvcBuilders.standaloneSetup(mean_aggregationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mean_aggregation createEntity(EntityManager em) {
        Mean_aggregation mean_aggregation = new Mean_aggregation()
            .stationID(DEFAULT_STATION_ID)
            .isWeekday(DEFAULT_IS_WEEKDAY)
            .minute(DEFAULT_MINUTE)
            .delta(DEFAULT_DELTA);
        return mean_aggregation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mean_aggregation createUpdatedEntity(EntityManager em) {
        Mean_aggregation mean_aggregation = new Mean_aggregation()
            .stationID(UPDATED_STATION_ID)
            .isWeekday(UPDATED_IS_WEEKDAY)
            .minute(UPDATED_MINUTE)
            .delta(UPDATED_DELTA);
        return mean_aggregation;
    }

    @BeforeEach
    public void initTest() {
        mean_aggregation = createEntity(em);
    }

    @Test
    @Transactional
    public void createMean_aggregation() throws Exception {
        int databaseSizeBeforeCreate = mean_aggregationRepository.findAll().size();

        // Create the Mean_aggregation
        restMean_aggregationMockMvc.perform(post("/api/mean-aggregations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mean_aggregation)))
            .andExpect(status().isCreated());

        // Validate the Mean_aggregation in the database
        List<Mean_aggregation> mean_aggregationList = mean_aggregationRepository.findAll();
        assertThat(mean_aggregationList).hasSize(databaseSizeBeforeCreate + 1);
        Mean_aggregation testMean_aggregation = mean_aggregationList.get(mean_aggregationList.size() - 1);
        assertThat(testMean_aggregation.getStationID()).isEqualTo(DEFAULT_STATION_ID);
        assertThat(testMean_aggregation.isIsWeekday()).isEqualTo(DEFAULT_IS_WEEKDAY);
        assertThat(testMean_aggregation.getMinute()).isEqualTo(DEFAULT_MINUTE);
        assertThat(testMean_aggregation.getDelta()).isEqualTo(DEFAULT_DELTA);
    }

    @Test
    @Transactional
    public void createMean_aggregationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mean_aggregationRepository.findAll().size();

        // Create the Mean_aggregation with an existing ID
        mean_aggregation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMean_aggregationMockMvc.perform(post("/api/mean-aggregations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mean_aggregation)))
            .andExpect(status().isBadRequest());

        // Validate the Mean_aggregation in the database
        List<Mean_aggregation> mean_aggregationList = mean_aggregationRepository.findAll();
        assertThat(mean_aggregationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMean_aggregations() throws Exception {
        // Initialize the database
        mean_aggregationRepository.saveAndFlush(mean_aggregation);

        // Get all the mean_aggregationList
        restMean_aggregationMockMvc.perform(get("/api/mean-aggregations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mean_aggregation.getId().intValue())))
            .andExpect(jsonPath("$.[*].stationID").value(hasItem(DEFAULT_STATION_ID)))
            .andExpect(jsonPath("$.[*].isWeekday").value(hasItem(DEFAULT_IS_WEEKDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].minute").value(hasItem(DEFAULT_MINUTE)))
            .andExpect(jsonPath("$.[*].delta").value(hasItem(DEFAULT_DELTA.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMean_aggregation() throws Exception {
        // Initialize the database
        mean_aggregationRepository.saveAndFlush(mean_aggregation);

        // Get the mean_aggregation
        restMean_aggregationMockMvc.perform(get("/api/mean-aggregations/{id}", mean_aggregation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mean_aggregation.getId().intValue()))
            .andExpect(jsonPath("$.stationID").value(DEFAULT_STATION_ID))
            .andExpect(jsonPath("$.isWeekday").value(DEFAULT_IS_WEEKDAY.booleanValue()))
            .andExpect(jsonPath("$.minute").value(DEFAULT_MINUTE))
            .andExpect(jsonPath("$.delta").value(DEFAULT_DELTA.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMean_aggregation() throws Exception {
        // Get the mean_aggregation
        restMean_aggregationMockMvc.perform(get("/api/mean-aggregations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMean_aggregation() throws Exception {
        // Initialize the database
        mean_aggregationRepository.saveAndFlush(mean_aggregation);

        int databaseSizeBeforeUpdate = mean_aggregationRepository.findAll().size();

        // Update the mean_aggregation
        Mean_aggregation updatedMean_aggregation = mean_aggregationRepository.findById(mean_aggregation.getId()).get();
        // Disconnect from session so that the updates on updatedMean_aggregation are not directly saved in db
        em.detach(updatedMean_aggregation);
        updatedMean_aggregation
            .stationID(UPDATED_STATION_ID)
            .isWeekday(UPDATED_IS_WEEKDAY)
            .minute(UPDATED_MINUTE)
            .delta(UPDATED_DELTA);

        restMean_aggregationMockMvc.perform(put("/api/mean-aggregations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMean_aggregation)))
            .andExpect(status().isOk());

        // Validate the Mean_aggregation in the database
        List<Mean_aggregation> mean_aggregationList = mean_aggregationRepository.findAll();
        assertThat(mean_aggregationList).hasSize(databaseSizeBeforeUpdate);
        Mean_aggregation testMean_aggregation = mean_aggregationList.get(mean_aggregationList.size() - 1);
        assertThat(testMean_aggregation.getStationID()).isEqualTo(UPDATED_STATION_ID);
        assertThat(testMean_aggregation.isIsWeekday()).isEqualTo(UPDATED_IS_WEEKDAY);
        assertThat(testMean_aggregation.getMinute()).isEqualTo(UPDATED_MINUTE);
        assertThat(testMean_aggregation.getDelta()).isEqualTo(UPDATED_DELTA);
    }

    @Test
    @Transactional
    public void updateNonExistingMean_aggregation() throws Exception {
        int databaseSizeBeforeUpdate = mean_aggregationRepository.findAll().size();

        // Create the Mean_aggregation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMean_aggregationMockMvc.perform(put("/api/mean-aggregations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mean_aggregation)))
            .andExpect(status().isBadRequest());

        // Validate the Mean_aggregation in the database
        List<Mean_aggregation> mean_aggregationList = mean_aggregationRepository.findAll();
        assertThat(mean_aggregationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMean_aggregation() throws Exception {
        // Initialize the database
        mean_aggregationRepository.saveAndFlush(mean_aggregation);

        int databaseSizeBeforeDelete = mean_aggregationRepository.findAll().size();

        // Delete the mean_aggregation
        restMean_aggregationMockMvc.perform(delete("/api/mean-aggregations/{id}", mean_aggregation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mean_aggregation> mean_aggregationList = mean_aggregationRepository.findAll();
        assertThat(mean_aggregationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
