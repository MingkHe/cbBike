package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class Station_informationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Station_information.class);
        Station_information station_information1 = new Station_information();
        station_information1.setId(1L);
        Station_information station_information2 = new Station_information();
        station_information2.setId(station_information1.getId());
        assertThat(station_information1).isEqualTo(station_information2);
        station_information2.setId(2L);
        assertThat(station_information1).isNotEqualTo(station_information2);
        station_information1.setId(null);
        assertThat(station_information1).isNotEqualTo(station_information2);
    }
}
