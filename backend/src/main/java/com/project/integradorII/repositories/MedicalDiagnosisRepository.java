package com.project.integradorII.repositories;

import com.project.integradorII.entities.MedicalDiagnosis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalDiagnosisRepository extends JpaRepository<MedicalDiagnosis, Long> {
}
