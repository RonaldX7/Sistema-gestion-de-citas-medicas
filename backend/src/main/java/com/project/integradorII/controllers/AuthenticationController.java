package com.project.integradorII.controllers;


import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.LoginRequest;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.services.Imp.PatientServiceImp;
import com.project.integradorII.services.Imp.UserServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final UserServiceImp userServiceImp;
    private final PatientServiceImp patientService;

    //@PostMapping("/sign-up")
    //public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRequest userRequest) {
    //    return new ResponseEntity<>(this.userServiceImp.createUser(userRequest), HttpStatus.CREATED);
    //}

    //metodo para crear paciente
    @PostMapping("/registrar")
    public ResponseEntity<PatientEntity> createPatient(@RequestBody @Valid PatientCreate patientCreate) {
        return new ResponseEntity<>(this.patientService.createPatient(patientCreate), HttpStatus.CREATED);
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        return new ResponseEntity<>(this.userServiceImp.loginUser(loginRequest), HttpStatus.OK);
    }
}
