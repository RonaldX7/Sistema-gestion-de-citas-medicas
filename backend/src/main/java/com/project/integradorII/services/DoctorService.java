package com.project.integradorII.services;

import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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
        //Crear y persistir el usuario
        UserEntity userEntity = new UserEntity();

        userEntity.setName(doctorRequest.name());
        userEntity.setLastName(doctorRequest.lastName());
        userEntity.setPhone(doctorRequest.phone());
        userEntity.setEmail(doctorRequest.email());
        userEntity.setUsername(doctorRequest.username());
        userEntity.setPassword(doctorRequest.password());

        RoleEnum roleEnum = RoleEnum.valueOf(doctorRequest.roleName());

        //Asignar el rol al usuario
        RoleEntity roleEntity = rolRepository.findRoleEntitiesByRoleEnum(roleEnum)
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

//        if (roleEntity == null) {
//            throw new IllegalArgumentException("Agrege un rol valido");
//        }
        userEntity.setRole(roleEntity);

        UserEntity userEntitySaved = userRepository.save(userEntity);

        //Crear y persistir el doctor
        DoctorEntity doctorEntity = new DoctorEntity();
        doctorEntity.setCmp(doctorRequest.cmp());
        doctorEntity.setUser(userEntitySaved);

        // Asignar especialidades al doctor
    Set<SpecialtyEntity> specialties = specialtyRepository.
            findSpecialtyEntitiesByNameIn(doctorRequest.specialty().specialtyListName())
            .stream().collect(Collectors.toSet());

        doctorEntity.setSpecialties(specialties);

        //Guardar doctor
        return doctorRepository.save(doctorEntity);
    }

}
