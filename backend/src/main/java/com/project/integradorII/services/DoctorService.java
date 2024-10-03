package com.project.integradorII.services;

import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private RoleRepository rolRepository;

    public DoctorEntity createDoctor(DoctorRequest doctorRequest) {

        RoleEnum roleEnum = RoleEnum.valueOf(doctorRequest.roleName());

        //Asignar el rol al usuario
        RoleEntity roleEntity = rolRepository.findRoleEntitiesByRoleEnum(roleEnum)
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Guardar la especialidad si no existe
        doctorRequest.specialty().specialtyListName().forEach(specialtyName -> {
            Optional<SpecialtyEntity> specialtyEntity = specialtyRepository.findByName(specialtyName);

            //Si no existe la especialidad se crea
            if (specialtyEntity.isEmpty()) {
                SpecialtyEntity specialty = SpecialtyEntity.builder().name(specialtyName).build();
                specialtyRepository.save(specialty);
            }
        });


        // Asignar especialidades al doctor
        Set<SpecialtyEntity> specialties = specialtyRepository.
                findSpecialtyEntitiesByNameIn(doctorRequest.specialty().specialtyListName())
                .stream().collect(Collectors.toSet());

        //Crear y persistir el Doctor
        DoctorEntity doctorEntity = DoctorEntity.builder()
                .cmp(doctorRequest.cmp())
                .specialties(specialties)
                .user(UserEntity.builder()
                        .name(doctorRequest.name())
                        .lastName(doctorRequest.lastName())
                        .phone(doctorRequest.phone())
                        .email(doctorRequest.email())
                        .username(doctorRequest.username())
                        .password(doctorRequest.password())
                        .role(roleEntity)
                        .build())
                .build();

        //Guardar doctor
        return doctorRepository.save(doctorEntity);
    }

}
