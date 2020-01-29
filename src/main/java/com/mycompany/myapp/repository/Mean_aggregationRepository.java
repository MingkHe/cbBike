package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Mean_aggregation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mean_aggregation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Mean_aggregationRepository extends JpaRepository<Mean_aggregation, Long> {

}
