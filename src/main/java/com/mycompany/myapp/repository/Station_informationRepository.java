package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Station_information;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Station_information entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Station_informationRepository extends JpaRepository<Station_information, Long> {

}
