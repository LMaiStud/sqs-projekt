package com.sqs_maier.repository;

import com.sqs_maier.model.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepository extends JpaRepository<Data, Long> {
    Data findFirstByOrderByIdDesc();

    boolean existsByHighwayCode(String highwayCode);

    Data findFirstByHighwayCode(String highwayCode);

}
