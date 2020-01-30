package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Mean_aggregation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Mean_aggregation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Mean_aggregationRepository extends JpaRepository<Mean_aggregation, Long> {
    Optional <Mean_aggregation> findMean_aggregationByStationIDAndMinuteAndIsWeekday(Integer sid, Integer minute, Boolean weekday);

}
