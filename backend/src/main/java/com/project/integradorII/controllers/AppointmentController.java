package com.project.integradorII.controllers;

import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.MedicalAppointment;
import com.project.integradorII.services.Imp.AppointmentServiceImp;
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
@RequestMapping("/cita")
public class AppointmentController {

    private final AppointmentServiceImp appointmentService;

    @PostMapping("/registrar")
    public ResponseEntity<MedicalAppointment> createAppointment(@RequestBody @Valid AppointmentRequest appointmentRequest){
        return new ResponseEntity<>(this.appointmentService.createAppointment(appointmentRequest), HttpStatus.CREATED);
    }

}
