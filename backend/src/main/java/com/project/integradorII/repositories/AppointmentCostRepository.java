package com.project.integradorII.repositories;

import com.project.integradorII.entities.AppointmentCosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentCostRepository extends JpaRepository<AppointmentCosts, Long> {
    Optional<AppointmentCosts> findBySpecialtyId(Long specialtyId);
}
