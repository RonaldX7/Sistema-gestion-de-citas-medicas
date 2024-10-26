package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.RoleEnum;
import com.project.integradorII.entities.UserEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PatientServiceImp implements PatientService {

    private final PatientRepository patientRepository;
    private final RoleRepository rolRepository;

    @Transactional
    @Override
    public List<PatientList> ListAllPatients() {
        List<PatientEntity> patients = patientRepository.findAll();

        //Mapeando lista de pacientes
        List<PatientList> patientLists = patients.stream()
                .map(patientEntity -> {
            return new PatientList(
                    patientEntity.getDni(),
                    patientEntity.getName(),
                    patientEntity.getLastName(),
                    patientEntity.getGender(),
                    patientEntity.getEmail()
            );

        }).collect(Collectors.toList());
        return patientLists;
    }

    @Transactional
    @Override
    public PatientEntity createPatient(PatientCreate patientCreate) {
        RoleEnum role = RoleEnum.valueOf(patientCreate.roleName());

        //Asignar el rol al paciente
        RoleEntity roleEntity = rolRepository.findRoleEntitiesByRoleEnum(role)
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Crear el paciente
        PatientEntity patientEntity = PatientEntity.builder()
                .name(patientCreate.name())
                .lastName(patientCreate.lastName())
                .dni(patientCreate.dni())
                .birthDate(patientCreate.birthDate())
                .direction(patientCreate.direction())
                .gender(patientCreate.gender())
                .phone(patientCreate.phone())
                .email(patientCreate.email())
                .user(UserEntity.builder()
                        .username(patientCreate.username())
                        .password(patientCreate.password())
                        .role(roleEntity)
                        .isEnabled(true)
                        .accountNoLocked(true)
                        .build())
                .build();

        //Guardar el paciente
        return patientRepository.save(patientEntity);
    }

    //Metodo para actualizar un paciente
    @Transactional
    @Override
    public PatientEntity updatePatient(Long id, PatientUpdate patientUpdate) {

        //Validar si el paciente existe
        PatientEntity patientEntity = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El paciente no existe"));

        //Actualizar los datos del paciente
        patientEntity.setName(patientUpdate.name());
        patientEntity.setLastName(patientUpdate.lastName());
        patientEntity.setDirection(patientUpdate.direction());
        patientEntity.setPhone(patientUpdate.phone());
        patientEntity.setEmail(patientUpdate.email());

        //actualizar los datos del usuario
        UserEntity user = patientEntity.getUser();
        user.setPassword(patientUpdate.password());

        return patientRepository.save(patientEntity);
    }

    @Transactional
    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);

    }
}
