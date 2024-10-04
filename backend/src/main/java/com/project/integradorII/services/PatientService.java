package com.project.integradorII.services;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.RoleEnum;
import com.project.integradorII.entities.UserEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private RoleRepository rolRepository;

    //Metodo para listar todos los pacientes


    //Metodo para crear un paciente
    public PatientEntity createPatient(PatientCreate patientCreate){
        RoleEnum role = RoleEnum.valueOf(patientCreate.roleName());

        //Asignar el rol al paciente
        RoleEntity roleEntity = rolRepository.findRoleEntitiesByRoleEnum(role)
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Crear el paciente
        PatientEntity patientEntity = PatientEntity.builder()
                .dni(patientCreate.dni())
                .birthDate(patientCreate.birthDate())
                .gender(patientCreate.gender())
                .direction(patientCreate.direction())
                .user(UserEntity.builder()
                        .name(patientCreate.name())
                        .lastName(patientCreate.lastName())
                        .phone(patientCreate.phone())
                        .email(patientCreate.email())
                        .username(patientCreate.username())
                        .password(patientCreate.password())
                        .isEnabled(true)
                        .accountNoLocked(true)
                        .role(roleEntity)
                        .build())
                .build();

        //Guardar el paciente
        return patientRepository.save(patientEntity);
    }

    //Metodo para actualizar un paciente


}
