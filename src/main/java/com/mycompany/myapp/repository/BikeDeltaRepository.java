package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.BikeDelta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BikeDelta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BikeDeltaRepository extends JpaRepository<BikeDelta, Long> {

}
