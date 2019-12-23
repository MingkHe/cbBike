package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Station;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Station entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    Optional<Station> findStationByName(String name);
}
