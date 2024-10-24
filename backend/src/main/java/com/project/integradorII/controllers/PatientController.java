package com.project.integradorII.controllers;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.services.Imp.PatientServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paciente")
public class PatientController {

    @Autowired
    private PatientServiceImp patientService;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private UserRepository userRepository;


    //metodo para listar pacientes
    @GetMapping("/listar")
    public ResponseEntity<List<PatientList>>ListAllPatients(){
        return new ResponseEntity<>(this.patientService.ListAllPatients(), HttpStatus.OK);
    }

    //metodo para crear paciente
    @PostMapping("/registrar")
    public ResponseEntity<PatientEntity> createPatient(@RequestBody @Valid PatientCreate patientCreate) {
        return new ResponseEntity<>(this.patientService.createPatient(patientCreate), HttpStatus.CREATED);
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
