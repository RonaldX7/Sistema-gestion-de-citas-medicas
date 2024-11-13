package com.project.integradorII.repositories;

import com.project.integradorII.entities.PatientEntity;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {

    PatientEntity findByDni(@NotBlank String dni);

    PatientEntity findByUserId(@NotBlank Long userId);
}
