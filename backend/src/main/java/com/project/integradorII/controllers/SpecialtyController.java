package com.project.integradorII.controllers;

import com.project.integradorII.entities.SpecialtyEntity;
import com.project.integradorII.services.Imp.SpecialtyServiceImp;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/especialidades")
public class SpecialtyController {

    private final SpecialtyServiceImp specialtyService;

    @GetMapping("/listar")
    public ResponseEntity<List<SpecialtyEntity>> ListAllSpecialties(){
        return new ResponseEntity<>(this.specialtyService.listAllSpecialties(), HttpStatus.OK);
    }

}
