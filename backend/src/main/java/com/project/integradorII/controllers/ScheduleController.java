package com.project.integradorII.controllers;

import com.project.integradorII.dto.doctorSchedule.ScheduleList;
import com.project.integradorII.dto.doctorSchedule.ScheduleRequest;
import com.project.integradorII.entities.DoctorSchedule;
import com.project.integradorII.services.Imp.ScheduleServiceImp;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/horarios")
public class ScheduleController {

    private final ScheduleServiceImp scheduleService;


    //metodo para listar el horario por doctor y fecha
    @GetMapping("/listar/{id}/{date}")
    public ResponseEntity <List<ScheduleList>> scheduleByDoctorAndDate(@PathVariable Long id, @PathVariable LocalDate date) {
        return new ResponseEntity<>(this.scheduleService.getScheduleByDoctorAndDate(id, date), HttpStatus.OK);
    }


    //metodo para registrar un horario
    @PostMapping("/registrar")
    public ResponseEntity<DoctorSchedule> createSchedule(@RequestBody @Valid ScheduleRequest scheduleRequest){
        return new ResponseEntity<>(this.scheduleService.createSchedule(scheduleRequest), HttpStatus.CREATED);

    }

    //metodo para actualizar un horario
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<DoctorSchedule> updateSchedule(@PathVariable Long id, @RequestBody @Valid ScheduleRequest scheduleRequest){
        return new ResponseEntity<>(this.scheduleService.updateSchedule(id, scheduleRequest), HttpStatus.OK);
    }


    //metodo para eliminar un horario por id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id){
        this.scheduleService.deleteSchedule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
