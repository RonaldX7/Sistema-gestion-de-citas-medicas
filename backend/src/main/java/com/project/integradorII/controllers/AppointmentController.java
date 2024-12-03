package com.project.integradorII.controllers;
import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.MedicalAppointment;
import com.project.integradorII.repositories.AppointmentStatusRepository;
import com.project.integradorII.services.AppointmentService;
import com.project.integradorII.services.Imp.AppointmentServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/cita")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentStatusRepository appointmentStatusRepository;

    //Metodo para listar el estado por id
    @GetMapping("/estado/{id}")
    public ResponseEntity<?> getAppointmentStatusById(@PathVariable Long id){
        return new ResponseEntity<>(this.appointmentStatusRepository.findById(id), HttpStatus.OK);
    }

    //metodo para listar todas las citas
    @GetMapping("/listar")
    public ResponseEntity<List<AppointmentList>> ListAllAppointments(){
        return new ResponseEntity<>(this.appointmentService.ListAllAppointments(), HttpStatus.OK);
    }

    //metodo para listar las citas por estado
    @GetMapping("/listar/{statusId}")
    public ResponseEntity<List<AppointmentList>> ListAppointmentByStatus(@PathVariable Long statusId){
        return new ResponseEntity<>(this.appointmentService.ListAppointmentByStatus(statusId), HttpStatus.OK);
    }

    //metodo para listar las citas por doctor
    @GetMapping("/doctor/{doctor_id}")
    public ResponseEntity<List<AppointmentList>> listAppointmentsByDoctor(@PathVariable Long doctor_id){
        return new ResponseEntity<>(this.appointmentService.ListAppointmentByDoctor(doctor_id), HttpStatus.OK);
    }

    //metodo para listar las citas por paciente
    @GetMapping("/paciente/{patient_id}")
    public ResponseEntity<List<AppointmentList>> listAppointmentsByPatient(@PathVariable Long patient_id){
        return new ResponseEntity<>(this.appointmentService.ListAppointmentByPatient(patient_id), HttpStatus.OK);
    }

    //metodo para registrar una cita
    @PostMapping("/registrar")
    public ResponseEntity<MedicalAppointment> createAppointment(@RequestBody @Valid AppointmentRequest appointmentRequest){
        return new ResponseEntity<>(this.appointmentService.createAppointment(appointmentRequest), HttpStatus.CREATED);
    }

    //metodo para actualizar una cita


    //metodo para cancelar una cita

}
