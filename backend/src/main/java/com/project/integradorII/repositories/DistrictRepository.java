package com.project.integradorII.repositories;

import com.project.integradorII.entities.DistrictEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictRepository extends JpaRepository<DistrictEntity, Long> {

    List<DistrictEntity> findByDepartment_Id(Long departmentId);
}
