package com.project.integradorII.services;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.DoctorEntity;

import java.util.List;

public interface DoctorService {

    List<DoctorList> ListAllDoctors();
    DoctorEntity createDoctor(DoctorRequest doctorRequest);
    DoctorEntity updateDoctor(Long id, DoctorUpdate doctorUpdate);
    void deleteDoctor(Long id);
}
