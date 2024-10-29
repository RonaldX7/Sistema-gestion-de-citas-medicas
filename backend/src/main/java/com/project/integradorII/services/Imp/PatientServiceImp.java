package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.GenderRepository;
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

    private final UserServiceImp userServiceImp;
    private final PatientRepository patientRepository;
    private final RoleRepository rolRepository;
    private final GenderRepository genderRepository;

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
                    patientEntity.getGender().getId(), //Aqui se obtiene el id del genero
                    patientEntity.getEmail()
            );

        }).collect(Collectors.toList());
        return patientLists;
    }

    @Transactional
    @Override
    public PatientEntity createPatient(PatientCreate patientCreate) {

        //Validar si el paciente ya existe
        PatientEntity patient = patientRepository.findByDni(patientCreate.dni());

        if (patient != null) {
            throw new IllegalArgumentException("El usuario ya existe");
        }

        //Asignar el rol al paciente
        RoleEntity roleEntity = rolRepository.findById(patientCreate.roleId())
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Asignar el genero al paciente
        GenderEntity genderEntity = genderRepository.findById(patientCreate.genderId())
                .orElseThrow(() -> new RuntimeException("El genero no existe"));

        //Crear el usuario
        UserRequest userRequest = new UserRequest(
                patientCreate.username(),
                patientCreate.password(),
                roleEntity.getId()
        );

        UserEntity userEntity = userServiceImp.createUser(userRequest);

        //Crear el paciente
        PatientEntity patientEntity = PatientEntity.builder()
                .name(patientCreate.name())
                .lastName(patientCreate.lastName())
                .dni(patientCreate.dni())
                .birthDate(patientCreate.birthDate())
                .direction(patientCreate.direction())
                .gender(genderEntity)
                .phone(patientCreate.phone())
                .email(patientCreate.email())
                .user(userEntity)
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
