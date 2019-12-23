package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.BikeDelta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the BikeDelta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BikeDeltaRepository extends JpaRepository<BikeDelta, Long> {
    Optional<BikeDelta> findBikeDeltaByStationIDAndMinuteAndWeekday(Integer sid, Integer minute, Boolean weekday);
    Optional<BikeDelta> findBikeDeltaByStationIDAndMinute(Integer sid, Integer minute);
    Optional<BikeDelta> findBikeDeltaByStationID(Integer sid);
}
