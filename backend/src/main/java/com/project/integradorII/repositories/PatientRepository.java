package com.project.integradorII.repositories;

import com.project.integradorII.entities.PatientEntity;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long> {

    PatientEntity findByDni(@NotBlank String dni);

    PatientEntity findByUserId(@NotBlank Long userId);

    Optional<PatientEntity> findByEmail(String email);

    boolean existsByEmail(String email);
}
