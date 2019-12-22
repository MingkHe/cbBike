package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class BikeDeltaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BikeDelta.class);
        BikeDelta bikeDelta1 = new BikeDelta();
        bikeDelta1.setId(1L);
        BikeDelta bikeDelta2 = new BikeDelta();
        bikeDelta2.setId(bikeDelta1.getId());
        assertThat(bikeDelta1).isEqualTo(bikeDelta2);
        bikeDelta2.setId(2L);
        assertThat(bikeDelta1).isNotEqualTo(bikeDelta2);
        bikeDelta1.setId(null);
        assertThat(bikeDelta1).isNotEqualTo(bikeDelta2);
    }
}
