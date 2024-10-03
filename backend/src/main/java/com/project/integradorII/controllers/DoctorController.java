package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Medico")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private DoctorRepository doctorRepository;

    //metodo para listar medicos
    @GetMapping("/listarMedicos")


    //metodo para crear medico
    @PostMapping("/postmedico")
    public ResponseEntity<DoctorEntity> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest){
        return new ResponseEntity<>(this.doctorService.createDoctor(doctorRequest), HttpStatus.CREATED);
    }

    //metodo para actualizar medico



    //metodo para eliminar un medico por id
    @DeleteMapping("/deletemedico/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id){
        doctorRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
