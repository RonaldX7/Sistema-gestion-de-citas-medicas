package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.services.Imp.DoctorServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequiredArgsConstructor
@RestController
@RequestMapping("/medico")
public class DoctorController {

    private final DoctorServiceImp doctorService;
    private final DoctorServiceImp doctorService;

    //metodo para listar medicos
    @GetMapping("/listar")
    public ResponseEntity<List<DoctorList>> ListAllDotors(){
        return new ResponseEntity<>(this.doctorService.ListAllDoctors(), HttpStatus.OK);
    }

    //metodo para listar medico por especialidad
    @GetMapping("/listar/{id}")
    public ResponseEntity<List<DoctorList>> ListAllDoctorsBySpecialty(@PathVariable Long specialty_id){
        return new ResponseEntity<>(this.doctorService.ListAllDoctorsBySpecialty(specialty_id), HttpStatus.OK);
    }

    //metodo para crear medico
    @PostMapping("/registrar")
    public ResponseEntity<DoctorEntity> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest){
        return new ResponseEntity<>(this.doctorService.createDoctor(doctorRequest), HttpStatus.CREATED);
    }

    //metodo para actualizar medico
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<DoctorEntity> updateDoctor(@PathVariable Long id,@RequestBody @Valid DoctorUpdate doctorUpdate){
        return new ResponseEntity<>(this.doctorService.updateDoctor(id, doctorUpdate), HttpStatus.OK);
    }

    //metodo para eliminar un medico por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id){
        this.doctorService.deleteDoctor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
