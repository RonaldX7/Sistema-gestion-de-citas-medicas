package com.project.integradorII.controllers;
import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.dto.appointment.AppointmentUpdate;
import com.project.integradorII.dto.appointment.DiagnosisRequest;
import com.project.integradorII.entities.MedicalAppointment;
import com.project.integradorII.entities.MedicalDiagnosis;
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
    @GetMapping("/estados")
    public ResponseEntity<?> getAppointmentStatusById(){
        try {
            return new ResponseEntity<>(this.appointmentStatusRepository.findAll(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar todas las citas
    @GetMapping("/listar")
    public ResponseEntity<List<AppointmentList>> ListAllAppointments(){
        try {
            return new ResponseEntity<>(this.appointmentService.ListAllAppointments(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar las citas por estado
    @GetMapping("/listar/{statusId}")
    public ResponseEntity<List<AppointmentList>> ListAppointmentByStatus(@PathVariable Long statusId){
        try {
            return new ResponseEntity<>(this.appointmentService.ListAppointmentByStatus(statusId), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar las citas por doctor
    @GetMapping("/doctor/{doctor_id}")
    public ResponseEntity<List<AppointmentList>> listAppointmentsByDoctor(@PathVariable Long doctor_id){
        try{
            return new ResponseEntity<>(this.appointmentService.ListAppointmentByDoctor(doctor_id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar las citas por paciente
    @GetMapping("/paciente/{patient_id}")
    public ResponseEntity<List<AppointmentList>> listAppointmentsByPatient(@PathVariable Long patient_id){
        try{
            return new ResponseEntity<>(this.appointmentService.ListAppointmentByPatient(patient_id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para registrar una cita
    @PostMapping("/registrar")
    public ResponseEntity<MedicalAppointment> createAppointment(@RequestBody @Valid AppointmentRequest appointmentRequest){
        try {
            return new ResponseEntity<>(this.appointmentService.createAppointment(appointmentRequest), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para registrar un diagnostico
    @PostMapping("/diagnostico/{appointmentId}")
    public ResponseEntity<MedicalDiagnosis> createDiagnosis(@PathVariable Long appointmentId, @RequestBody @Valid DiagnosisRequest diagnosisRequest){
        try {
            return new ResponseEntity<>(this.appointmentService.createDiagnosis(appointmentId, diagnosisRequest), HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para reprogramar una cita
    @PutMapping("/reprogramar/{id}")
    public ResponseEntity<MedicalAppointment> updateAppointment(@PathVariable Long id, @RequestBody @Valid AppointmentUpdate appointmentUpdate){
        try {
            return new ResponseEntity<>(this.appointmentService.updateAppointment(id, appointmentUpdate), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //metodo para cancelar una cita
    @PutMapping("/cancelar/{id}/{statusId}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id, @PathVariable Long statusId){
        try {
            this.appointmentService.cancelAppointment(id, statusId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
