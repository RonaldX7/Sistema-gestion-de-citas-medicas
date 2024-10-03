package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.services.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medico")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;

    //metodo para listar medicos
    @GetMapping("/listar")
    public ResponseEntity<List<DoctorList>> ListAllDotors(){
        return new ResponseEntity<>(this.doctorService.ListAllDoctors(), HttpStatus.OK);
    }

    //metodo para crear medico
    @PostMapping("/crear")
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
        userRepository.deleteById(id);
        doctorRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
