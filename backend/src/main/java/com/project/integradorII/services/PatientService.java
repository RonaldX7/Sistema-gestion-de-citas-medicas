package com.project.integradorII.services;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;

import java.util.List;

public interface PatientService {

    List<PatientList> ListAllPatients();
    PatientEntity createPatient(PatientCreate patientCreate);
    PatientEntity updatePatient(Long id, PatientUpdate patientUpdate);
    void deletePatient(Long id);
}
