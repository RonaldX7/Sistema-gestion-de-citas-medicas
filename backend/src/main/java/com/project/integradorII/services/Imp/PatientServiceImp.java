package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PatientServiceImp implements PatientService {

    private final PatientRepository patientRepository;
    private final RoleRepository rolRepository;

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

    @Override
    public PatientEntity createPatient(PatientCreate patientCreate) {
        return null;
    }

    @Override
    public PatientEntity updatePatient(Long id, PatientUpdate patientUpdate) {
        return null;
    }

    @Override
    public void deletePatient(Long id) {

    }
}
