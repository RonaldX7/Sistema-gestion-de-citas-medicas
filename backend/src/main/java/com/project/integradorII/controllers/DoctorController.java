package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/holomedic")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/getmedico")
    public String hello() {
        return "Hello, World!";
    }

    @PostMapping("/postmedico")
    public ResponseEntity<DoctorEntity> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest){
        return new ResponseEntity<>(this.doctorService.createDoctor(doctorRequest), HttpStatus.CREATED);
    }


}
