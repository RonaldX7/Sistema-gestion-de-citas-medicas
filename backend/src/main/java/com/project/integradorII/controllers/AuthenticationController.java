package com.project.integradorII.controllers;


import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.LoginRequest;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.password.PasswordUpdateRequest;
import com.project.integradorII.dto.patient.PatientCreate;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.services.Imp.PatientServiceImp;
import com.project.integradorII.services.Imp.UserServiceImp;
import com.project.integradorII.services.PatientService;
import com.project.integradorII.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final UserService userService;
    private final PatientService patientService;

    //@PostMapping("/sign-up")
    //public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRequest userRequest) {
    //    return new ResponseEntity<>(this.userServiceImp.createUser(userRequest), HttpStatus.CREATED);
    //}

    //metodo para crear paciente
    @PostMapping("/registrar")
    public ResponseEntity<PatientEntity> createPatient(@RequestBody @Valid PatientCreate patientCreate) {
        return new ResponseEntity<>(this.patientService.createPatient(patientCreate), HttpStatus.CREATED);
    }

    //metodo para logearse
    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        return new ResponseEntity<>(this.userService.loginUser(loginRequest), HttpStatus.OK);
    }

    //metodo para recuperar contraseña
    @PostMapping("/recover-password/{email}")
    public ResponseEntity<?> recoverPassword(@PathVariable String email) throws MessagingException, IOException {
        return ResponseEntity.ok(this.userService.recuperarContrasena(email));
    }

    //metodo para cambiar contraseña
    @PostMapping("/change-password")
    public ResponseEntity<?> cambiarContrasena(@Valid @RequestBody PasswordUpdateRequest password, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.badRequest().body(errors);
        }
        return userService.cambiarContrasena(password);
    }

}
