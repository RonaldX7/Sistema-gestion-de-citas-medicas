package com.project.integradorII.controllers;

import com.project.integradorII.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/holomedic")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/getmedico")
    public String hello() {
        return "Hello, World!";
    }

    @PostMapping("/postmedico")
    public String post() {
        return "Post request has been made!";
    }


}
