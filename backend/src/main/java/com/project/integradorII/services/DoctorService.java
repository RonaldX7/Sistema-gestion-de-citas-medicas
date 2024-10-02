package com.project.integradorII.services;

import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository rolRepository;

    public DoctorEntity createDoctor(DoctorRequest doctorRequest) {
        return null;
    }

}
