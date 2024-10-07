package com.project.integradorII.services;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.RoleEnum;
import com.project.integradorII.entities.UserEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private RoleRepository rolRepository;

    //Metodo para listar todos los pacientes
    public List<PatientList> ListAllPatients(){
        List<PatientEntity> patients = patientRepository.findAll();

        //Mapeando lista de pacientes
        List<PatientList> patientLists = patients.stream().map(patientEntity -> {
            return new PatientList(
                    patientEntity.getDni(),
                    patientEntity.getUser().getName(),
                    patientEntity.getUser().getLastName(),
                    patientEntity.getGender(),
                    patientEntity.getUser().getEmail()
            );

        }).collect(Collectors.toList());
        return patientLists;
    }


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
    public PatientEntity updatePatient(Long id, PatientUpdate patientUpdate){

        //Buscar al paciente por ID
        PatientEntity patientEntity = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        //Actualizar los datos del paciente
        patientEntity.setDirection(patientUpdate.direction());

        //estos son los datos que tientodousuario
        UserEntity user = patientEntity.getUser();
        user.setName(patientUpdate.name());
        user.setLastName(patientUpdate.lastName());
        user.setPhone(patientUpdate.phone());
        user.setEmail(patientUpdate.email());
        user.setPassword(patientUpdate.password());

        return patientRepository.save(patientEntity);
    }

    //Metodo para borrar un paciente
    public void deletePatient(Long id){
        patientRepository.deleteById(id);
    }

}
