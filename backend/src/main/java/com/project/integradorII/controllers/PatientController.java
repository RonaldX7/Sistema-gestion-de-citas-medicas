package com.project.integradorII.controllers;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.services.Imp.PatientServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paciente")
public class PatientController {

    private final PatientServiceImp patientService;

    private final PatientRepository patientRepository;

    private final UserRepository userRepository;


    //metodo para listar pacientes
    @GetMapping("/listar")
    public ResponseEntity<List<PatientList>>ListAllPatients(){
        return new ResponseEntity<>(this.patientService.ListAllPatients(), HttpStatus.OK);
    }


    //metodo para actualizar paciente
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<PatientEntity> updatePatient(@PathVariable Long id, @RequestBody @Valid PatientUpdate patientUpdate){
        return new ResponseEntity<>(this.patientService.updatePatient(id,patientUpdate),HttpStatus.OK);
    }

    //eliminar el paciente
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        userRepository.deleteById(id);
        patientRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
