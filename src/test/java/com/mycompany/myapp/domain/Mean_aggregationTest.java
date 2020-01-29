package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class Mean_aggregationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mean_aggregation.class);
        Mean_aggregation mean_aggregation1 = new Mean_aggregation();
        mean_aggregation1.setId(1L);
        Mean_aggregation mean_aggregation2 = new Mean_aggregation();
        mean_aggregation2.setId(mean_aggregation1.getId());
        assertThat(mean_aggregation1).isEqualTo(mean_aggregation2);
        mean_aggregation2.setId(2L);
        assertThat(mean_aggregation1).isNotEqualTo(mean_aggregation2);
        mean_aggregation1.setId(null);
        assertThat(mean_aggregation1).isNotEqualTo(mean_aggregation2);
    }
}
