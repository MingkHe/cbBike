package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Station;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Station entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StationRepository extends JpaRepository<Station, Long> {

}
