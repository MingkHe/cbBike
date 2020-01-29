package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CbPlusApp;
import com.mycompany.myapp.domain.Station_information;
import com.mycompany.myapp.repository.Station_informationRepository;
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
 * Integration tests for the {@link Station_informationResource} REST controller.
 */
@SpringBootTest(classes = CbPlusApp.class)
public class Station_informationResourceIT {

    private static final Integer DEFAULT_STATION_ID = 1;
    private static final Integer UPDATED_STATION_ID = 2;

    private static final String DEFAULT_EXTERNAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNAL_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_SHORT_NAME = 1D;
    private static final Double UPDATED_SHORT_NAME = 2D;

    private static final Double DEFAULT_LAT = 1D;
    private static final Double UPDATED_LAT = 2D;

    private static final Double DEFAULT_LON = 1D;
    private static final Double UPDATED_LON = 2D;

    private static final Integer DEFAULT_REGION_ID = 1;
    private static final Integer UPDATED_REGION_ID = 2;

    private static final String DEFAULT_RENTAL_METHODS_0 = "AAAAAAAAAA";
    private static final String UPDATED_RENTAL_METHODS_0 = "BBBBBBBBBB";

    private static final String DEFAULT_RENTAL_METHODS_1 = "AAAAAAAAAA";
    private static final String UPDATED_RENTAL_METHODS_1 = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final String DEFAULT_RENTAL_URL = "AAAAAAAAAA";
    private static final String UPDATED_RENTAL_URL = "BBBBBBBBBB";

    private static final String DEFAULT_ELECTRIC_BIKE_SURCHARGE_WAIVER = "AAAAAAAAAA";
    private static final String UPDATED_ELECTRIC_BIKE_SURCHARGE_WAIVER = "BBBBBBBBBB";

    private static final String DEFAULT_EIGHTD_HAS_KEY_DISPENSER = "AAAAAAAAAA";
    private static final String UPDATED_EIGHTD_HAS_KEY_DISPENSER = "BBBBBBBBBB";

    @Autowired
    private Station_informationRepository station_informationRepository;

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

    private MockMvc restStation_informationMockMvc;

    private Station_information station_information;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Station_informationResource station_informationResource = new Station_informationResource(station_informationRepository);
        this.restStation_informationMockMvc = MockMvcBuilders.standaloneSetup(station_informationResource)
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
    public static Station_information createEntity(EntityManager em) {
        Station_information station_information = new Station_information()
            .station_id(DEFAULT_STATION_ID)
            .external_id(DEFAULT_EXTERNAL_ID)
            .name(DEFAULT_NAME)
            .short_name(DEFAULT_SHORT_NAME)
            .lat(DEFAULT_LAT)
            .lon(DEFAULT_LON)
            .region_id(DEFAULT_REGION_ID)
            .rental_methods_0(DEFAULT_RENTAL_METHODS_0)
            .rental_methods_1(DEFAULT_RENTAL_METHODS_1)
            .capacity(DEFAULT_CAPACITY)
            .rental_url(DEFAULT_RENTAL_URL)
            .electric_bike_surcharge_waiver(DEFAULT_ELECTRIC_BIKE_SURCHARGE_WAIVER)
            .eightd_has_key_dispenser(DEFAULT_EIGHTD_HAS_KEY_DISPENSER);
        return station_information;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Station_information createUpdatedEntity(EntityManager em) {
        Station_information station_information = new Station_information()
            .station_id(UPDATED_STATION_ID)
            .external_id(UPDATED_EXTERNAL_ID)
            .name(UPDATED_NAME)
            .short_name(UPDATED_SHORT_NAME)
            .lat(UPDATED_LAT)
            .lon(UPDATED_LON)
            .region_id(UPDATED_REGION_ID)
            .rental_methods_0(UPDATED_RENTAL_METHODS_0)
            .rental_methods_1(UPDATED_RENTAL_METHODS_1)
            .capacity(UPDATED_CAPACITY)
            .rental_url(UPDATED_RENTAL_URL)
            .electric_bike_surcharge_waiver(UPDATED_ELECTRIC_BIKE_SURCHARGE_WAIVER)
            .eightd_has_key_dispenser(UPDATED_EIGHTD_HAS_KEY_DISPENSER);
        return station_information;
    }

    @BeforeEach
    public void initTest() {
        station_information = createEntity(em);
    }

    @Test
    @Transactional
    public void createStation_information() throws Exception {
        int databaseSizeBeforeCreate = station_informationRepository.findAll().size();

        // Create the Station_information
        restStation_informationMockMvc.perform(post("/api/station-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(station_information)))
            .andExpect(status().isCreated());

        // Validate the Station_information in the database
        List<Station_information> station_informationList = station_informationRepository.findAll();
        assertThat(station_informationList).hasSize(databaseSizeBeforeCreate + 1);
        Station_information testStation_information = station_informationList.get(station_informationList.size() - 1);
        assertThat(testStation_information.getStation_id()).isEqualTo(DEFAULT_STATION_ID);
        assertThat(testStation_information.getExternal_id()).isEqualTo(DEFAULT_EXTERNAL_ID);
        assertThat(testStation_information.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStation_information.getShort_name()).isEqualTo(DEFAULT_SHORT_NAME);
        assertThat(testStation_information.getLat()).isEqualTo(DEFAULT_LAT);
        assertThat(testStation_information.getLon()).isEqualTo(DEFAULT_LON);
        assertThat(testStation_information.getRegion_id()).isEqualTo(DEFAULT_REGION_ID);
        assertThat(testStation_information.getRental_methods_0()).isEqualTo(DEFAULT_RENTAL_METHODS_0);
        assertThat(testStation_information.getRental_methods_1()).isEqualTo(DEFAULT_RENTAL_METHODS_1);
        assertThat(testStation_information.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testStation_information.getRental_url()).isEqualTo(DEFAULT_RENTAL_URL);
        assertThat(testStation_information.getElectric_bike_surcharge_waiver()).isEqualTo(DEFAULT_ELECTRIC_BIKE_SURCHARGE_WAIVER);
        assertThat(testStation_information.getEightd_has_key_dispenser()).isEqualTo(DEFAULT_EIGHTD_HAS_KEY_DISPENSER);
    }

    @Test
    @Transactional
    public void createStation_informationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = station_informationRepository.findAll().size();

        // Create the Station_information with an existing ID
        station_information.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStation_informationMockMvc.perform(post("/api/station-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(station_information)))
            .andExpect(status().isBadRequest());

        // Validate the Station_information in the database
        List<Station_information> station_informationList = station_informationRepository.findAll();
        assertThat(station_informationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStation_informations() throws Exception {
        // Initialize the database
        station_informationRepository.saveAndFlush(station_information);

        // Get all the station_informationList
        restStation_informationMockMvc.perform(get("/api/station-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(station_information.getId().intValue())))
            .andExpect(jsonPath("$.[*].station_id").value(hasItem(DEFAULT_STATION_ID)))
            .andExpect(jsonPath("$.[*].external_id").value(hasItem(DEFAULT_EXTERNAL_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].short_name").value(hasItem(DEFAULT_SHORT_NAME.doubleValue())))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].lon").value(hasItem(DEFAULT_LON.doubleValue())))
            .andExpect(jsonPath("$.[*].region_id").value(hasItem(DEFAULT_REGION_ID)))
            .andExpect(jsonPath("$.[*].rental_methods_0").value(hasItem(DEFAULT_RENTAL_METHODS_0)))
            .andExpect(jsonPath("$.[*].rental_methods_1").value(hasItem(DEFAULT_RENTAL_METHODS_1)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].rental_url").value(hasItem(DEFAULT_RENTAL_URL)))
            .andExpect(jsonPath("$.[*].electric_bike_surcharge_waiver").value(hasItem(DEFAULT_ELECTRIC_BIKE_SURCHARGE_WAIVER)))
            .andExpect(jsonPath("$.[*].eightd_has_key_dispenser").value(hasItem(DEFAULT_EIGHTD_HAS_KEY_DISPENSER)));
    }
    
    @Test
    @Transactional
    public void getStation_information() throws Exception {
        // Initialize the database
        station_informationRepository.saveAndFlush(station_information);

        // Get the station_information
        restStation_informationMockMvc.perform(get("/api/station-informations/{id}", station_information.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(station_information.getId().intValue()))
            .andExpect(jsonPath("$.station_id").value(DEFAULT_STATION_ID))
            .andExpect(jsonPath("$.external_id").value(DEFAULT_EXTERNAL_ID))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.short_name").value(DEFAULT_SHORT_NAME.doubleValue()))
            .andExpect(jsonPath("$.lat").value(DEFAULT_LAT.doubleValue()))
            .andExpect(jsonPath("$.lon").value(DEFAULT_LON.doubleValue()))
            .andExpect(jsonPath("$.region_id").value(DEFAULT_REGION_ID))
            .andExpect(jsonPath("$.rental_methods_0").value(DEFAULT_RENTAL_METHODS_0))
            .andExpect(jsonPath("$.rental_methods_1").value(DEFAULT_RENTAL_METHODS_1))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.rental_url").value(DEFAULT_RENTAL_URL))
            .andExpect(jsonPath("$.electric_bike_surcharge_waiver").value(DEFAULT_ELECTRIC_BIKE_SURCHARGE_WAIVER))
            .andExpect(jsonPath("$.eightd_has_key_dispenser").value(DEFAULT_EIGHTD_HAS_KEY_DISPENSER));
    }

    @Test
    @Transactional
    public void getNonExistingStation_information() throws Exception {
        // Get the station_information
        restStation_informationMockMvc.perform(get("/api/station-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStation_information() throws Exception {
        // Initialize the database
        station_informationRepository.saveAndFlush(station_information);

        int databaseSizeBeforeUpdate = station_informationRepository.findAll().size();

        // Update the station_information
        Station_information updatedStation_information = station_informationRepository.findById(station_information.getId()).get();
        // Disconnect from session so that the updates on updatedStation_information are not directly saved in db
        em.detach(updatedStation_information);
        updatedStation_information
            .station_id(UPDATED_STATION_ID)
            .external_id(UPDATED_EXTERNAL_ID)
            .name(UPDATED_NAME)
            .short_name(UPDATED_SHORT_NAME)
            .lat(UPDATED_LAT)
            .lon(UPDATED_LON)
            .region_id(UPDATED_REGION_ID)
            .rental_methods_0(UPDATED_RENTAL_METHODS_0)
            .rental_methods_1(UPDATED_RENTAL_METHODS_1)
            .capacity(UPDATED_CAPACITY)
            .rental_url(UPDATED_RENTAL_URL)
            .electric_bike_surcharge_waiver(UPDATED_ELECTRIC_BIKE_SURCHARGE_WAIVER)
            .eightd_has_key_dispenser(UPDATED_EIGHTD_HAS_KEY_DISPENSER);

        restStation_informationMockMvc.perform(put("/api/station-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStation_information)))
            .andExpect(status().isOk());

        // Validate the Station_information in the database
        List<Station_information> station_informationList = station_informationRepository.findAll();
        assertThat(station_informationList).hasSize(databaseSizeBeforeUpdate);
        Station_information testStation_information = station_informationList.get(station_informationList.size() - 1);
        assertThat(testStation_information.getStation_id()).isEqualTo(UPDATED_STATION_ID);
        assertThat(testStation_information.getExternal_id()).isEqualTo(UPDATED_EXTERNAL_ID);
        assertThat(testStation_information.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStation_information.getShort_name()).isEqualTo(UPDATED_SHORT_NAME);
        assertThat(testStation_information.getLat()).isEqualTo(UPDATED_LAT);
        assertThat(testStation_information.getLon()).isEqualTo(UPDATED_LON);
        assertThat(testStation_information.getRegion_id()).isEqualTo(UPDATED_REGION_ID);
        assertThat(testStation_information.getRental_methods_0()).isEqualTo(UPDATED_RENTAL_METHODS_0);
        assertThat(testStation_information.getRental_methods_1()).isEqualTo(UPDATED_RENTAL_METHODS_1);
        assertThat(testStation_information.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testStation_information.getRental_url()).isEqualTo(UPDATED_RENTAL_URL);
        assertThat(testStation_information.getElectric_bike_surcharge_waiver()).isEqualTo(UPDATED_ELECTRIC_BIKE_SURCHARGE_WAIVER);
        assertThat(testStation_information.getEightd_has_key_dispenser()).isEqualTo(UPDATED_EIGHTD_HAS_KEY_DISPENSER);
    }

    @Test
    @Transactional
    public void updateNonExistingStation_information() throws Exception {
        int databaseSizeBeforeUpdate = station_informationRepository.findAll().size();

        // Create the Station_information

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStation_informationMockMvc.perform(put("/api/station-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(station_information)))
            .andExpect(status().isBadRequest());

        // Validate the Station_information in the database
        List<Station_information> station_informationList = station_informationRepository.findAll();
        assertThat(station_informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStation_information() throws Exception {
        // Initialize the database
        station_informationRepository.saveAndFlush(station_information);

        int databaseSizeBeforeDelete = station_informationRepository.findAll().size();

        // Delete the station_information
        restStation_informationMockMvc.perform(delete("/api/station-informations/{id}", station_information.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Station_information> station_informationList = station_informationRepository.findAll();
        assertThat(station_informationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
