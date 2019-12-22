package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CbPlusApp;
import com.mycompany.myapp.domain.BikeDelta;
import com.mycompany.myapp.repository.BikeDeltaRepository;
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
 * Integration tests for the {@link BikeDeltaResource} REST controller.
 */
@SpringBootTest(classes = CbPlusApp.class)
public class BikeDeltaResourceIT {

    private static final Integer DEFAULT_STATION_ID = 1;
    private static final Integer UPDATED_STATION_ID = 2;

    private static final Integer DEFAULT_MINUTE = 1;
    private static final Integer UPDATED_MINUTE = 2;

    private static final Boolean DEFAULT_WEEKDAY = false;
    private static final Boolean UPDATED_WEEKDAY = true;

    private static final Double DEFAULT_DELTA_VALUE = 1D;
    private static final Double UPDATED_DELTA_VALUE = 2D;

    @Autowired
    private BikeDeltaRepository bikeDeltaRepository;

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

    private MockMvc restBikeDeltaMockMvc;

    private BikeDelta bikeDelta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BikeDeltaResource bikeDeltaResource = new BikeDeltaResource(bikeDeltaRepository);
        this.restBikeDeltaMockMvc = MockMvcBuilders.standaloneSetup(bikeDeltaResource)
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
    public static BikeDelta createEntity(EntityManager em) {
        BikeDelta bikeDelta = new BikeDelta()
            .stationID(DEFAULT_STATION_ID)
            .minute(DEFAULT_MINUTE)
            .weekday(DEFAULT_WEEKDAY)
            .deltaValue(DEFAULT_DELTA_VALUE);
        return bikeDelta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BikeDelta createUpdatedEntity(EntityManager em) {
        BikeDelta bikeDelta = new BikeDelta()
            .stationID(UPDATED_STATION_ID)
            .minute(UPDATED_MINUTE)
            .weekday(UPDATED_WEEKDAY)
            .deltaValue(UPDATED_DELTA_VALUE);
        return bikeDelta;
    }

    @BeforeEach
    public void initTest() {
        bikeDelta = createEntity(em);
    }

    @Test
    @Transactional
    public void createBikeDelta() throws Exception {
        int databaseSizeBeforeCreate = bikeDeltaRepository.findAll().size();

        // Create the BikeDelta
        restBikeDeltaMockMvc.perform(post("/api/bike-deltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bikeDelta)))
            .andExpect(status().isCreated());

        // Validate the BikeDelta in the database
        List<BikeDelta> bikeDeltaList = bikeDeltaRepository.findAll();
        assertThat(bikeDeltaList).hasSize(databaseSizeBeforeCreate + 1);
        BikeDelta testBikeDelta = bikeDeltaList.get(bikeDeltaList.size() - 1);
        assertThat(testBikeDelta.getStationID()).isEqualTo(DEFAULT_STATION_ID);
        assertThat(testBikeDelta.getMinute()).isEqualTo(DEFAULT_MINUTE);
        assertThat(testBikeDelta.isWeekday()).isEqualTo(DEFAULT_WEEKDAY);
        assertThat(testBikeDelta.getDeltaValue()).isEqualTo(DEFAULT_DELTA_VALUE);
    }

    @Test
    @Transactional
    public void createBikeDeltaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bikeDeltaRepository.findAll().size();

        // Create the BikeDelta with an existing ID
        bikeDelta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBikeDeltaMockMvc.perform(post("/api/bike-deltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bikeDelta)))
            .andExpect(status().isBadRequest());

        // Validate the BikeDelta in the database
        List<BikeDelta> bikeDeltaList = bikeDeltaRepository.findAll();
        assertThat(bikeDeltaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBikeDeltas() throws Exception {
        // Initialize the database
        bikeDeltaRepository.saveAndFlush(bikeDelta);

        // Get all the bikeDeltaList
        restBikeDeltaMockMvc.perform(get("/api/bike-deltas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bikeDelta.getId().intValue())))
            .andExpect(jsonPath("$.[*].stationID").value(hasItem(DEFAULT_STATION_ID)))
            .andExpect(jsonPath("$.[*].minute").value(hasItem(DEFAULT_MINUTE)))
            .andExpect(jsonPath("$.[*].weekday").value(hasItem(DEFAULT_WEEKDAY.booleanValue())))
            .andExpect(jsonPath("$.[*].deltaValue").value(hasItem(DEFAULT_DELTA_VALUE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getBikeDelta() throws Exception {
        // Initialize the database
        bikeDeltaRepository.saveAndFlush(bikeDelta);

        // Get the bikeDelta
        restBikeDeltaMockMvc.perform(get("/api/bike-deltas/{id}", bikeDelta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bikeDelta.getId().intValue()))
            .andExpect(jsonPath("$.stationID").value(DEFAULT_STATION_ID))
            .andExpect(jsonPath("$.minute").value(DEFAULT_MINUTE))
            .andExpect(jsonPath("$.weekday").value(DEFAULT_WEEKDAY.booleanValue()))
            .andExpect(jsonPath("$.deltaValue").value(DEFAULT_DELTA_VALUE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBikeDelta() throws Exception {
        // Get the bikeDelta
        restBikeDeltaMockMvc.perform(get("/api/bike-deltas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBikeDelta() throws Exception {
        // Initialize the database
        bikeDeltaRepository.saveAndFlush(bikeDelta);

        int databaseSizeBeforeUpdate = bikeDeltaRepository.findAll().size();

        // Update the bikeDelta
        BikeDelta updatedBikeDelta = bikeDeltaRepository.findById(bikeDelta.getId()).get();
        // Disconnect from session so that the updates on updatedBikeDelta are not directly saved in db
        em.detach(updatedBikeDelta);
        updatedBikeDelta
            .stationID(UPDATED_STATION_ID)
            .minute(UPDATED_MINUTE)
            .weekday(UPDATED_WEEKDAY)
            .deltaValue(UPDATED_DELTA_VALUE);

        restBikeDeltaMockMvc.perform(put("/api/bike-deltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBikeDelta)))
            .andExpect(status().isOk());

        // Validate the BikeDelta in the database
        List<BikeDelta> bikeDeltaList = bikeDeltaRepository.findAll();
        assertThat(bikeDeltaList).hasSize(databaseSizeBeforeUpdate);
        BikeDelta testBikeDelta = bikeDeltaList.get(bikeDeltaList.size() - 1);
        assertThat(testBikeDelta.getStationID()).isEqualTo(UPDATED_STATION_ID);
        assertThat(testBikeDelta.getMinute()).isEqualTo(UPDATED_MINUTE);
        assertThat(testBikeDelta.isWeekday()).isEqualTo(UPDATED_WEEKDAY);
        assertThat(testBikeDelta.getDeltaValue()).isEqualTo(UPDATED_DELTA_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingBikeDelta() throws Exception {
        int databaseSizeBeforeUpdate = bikeDeltaRepository.findAll().size();

        // Create the BikeDelta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBikeDeltaMockMvc.perform(put("/api/bike-deltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bikeDelta)))
            .andExpect(status().isBadRequest());

        // Validate the BikeDelta in the database
        List<BikeDelta> bikeDeltaList = bikeDeltaRepository.findAll();
        assertThat(bikeDeltaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBikeDelta() throws Exception {
        // Initialize the database
        bikeDeltaRepository.saveAndFlush(bikeDelta);

        int databaseSizeBeforeDelete = bikeDeltaRepository.findAll().size();

        // Delete the bikeDelta
        restBikeDeltaMockMvc.perform(delete("/api/bike-deltas/{id}", bikeDelta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BikeDelta> bikeDeltaList = bikeDeltaRepository.findAll();
        assertThat(bikeDeltaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
