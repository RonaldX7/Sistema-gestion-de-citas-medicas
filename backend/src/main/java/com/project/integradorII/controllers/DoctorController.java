package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.services.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/medico")
public class DoctorController {

    private final DoctorService doctorService;

    //metodo para listar medicos
    @GetMapping("/listar")
    public ResponseEntity<List<DoctorList>> ListAllDotors(){
        try {
            return new ResponseEntity<>(this.doctorService.ListAllDoctors(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar medico por user id
    @GetMapping("/{userId}")
    public ResponseEntity<List<DoctorList>> ListDoctorById(@PathVariable Long userId){
        if (userId != null){
            return new ResponseEntity<>(this.doctorService.ListByUserId(userId), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //metodo para listar medico por especialidad
    @GetMapping("/listar/{specialty_id}")
    public ResponseEntity<List<DoctorList>> ListAllDoctorsBySpecialty(@PathVariable Long specialty_id){
        return new ResponseEntity<>(this.doctorService.ListAllDoctorsBySpecialty(specialty_id), HttpStatus.OK);
    }

    //metodo para crear medico
    @PostMapping("/registrar")
    public ResponseEntity<DoctorEntity> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest){
        try {
            return new ResponseEntity<>(this.doctorService.createDoctor(doctorRequest), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //metodo para actualizar medico
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<DoctorEntity> updateDoctor(@PathVariable Long id,@RequestBody @Valid DoctorUpdate doctorUpdate){
        try {
            return new ResponseEntity<>(this.doctorService.updateDoctor(id,doctorUpdate), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //metodo para eliminar un medico por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id){
        this.doctorService.deleteDoctor(id);
        try {
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
