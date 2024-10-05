package com.project.integradorII.controllers;

import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.services.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paciente")
public class PatientController {

    @Autowired
    private PatientService patientService;

    //metodo para listar pacientes


    //metodo para crear paciente
    @PostMapping("/registrar")
    public ResponseEntity<PatientEntity> createPatient(@RequestBody @Valid PatientCreate patientCreate) {
        return new ResponseEntity<>(this.patientService.createPatient(patientCreate), HttpStatus.CREATED);
    }

    //metodo para actualizar paciente
}
