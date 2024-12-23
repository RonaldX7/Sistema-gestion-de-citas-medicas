package com.project.integradorII.controllers;

import com.project.integradorII.dto.patient.PatientList;
import com.project.integradorII.dto.patient.PatientUpdate;
import com.project.integradorII.entities.DepartmentEntity;
import com.project.integradorII.entities.DistrictEntity;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.repositories.DepartmentRepository;
import com.project.integradorII.repositories.DistrictRepository;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.services.Imp.PatientServiceImp;
import com.project.integradorII.services.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/paciente")
public class PatientController {

    private final PatientService patientService;

    private final PatientRepository patientRepository;

    private final UserRepository userRepository;

    private final DepartmentRepository departmentRepository;

    private final DistrictRepository districtRepository;

    //metodo para listar los departamentos
    @GetMapping("/departamentos")
    public ResponseEntity<List<DepartmentEntity>> ListDepartments(){
        return new ResponseEntity<>(this.departmentRepository.findAll(),HttpStatus.OK);
    }

    //metodo para listar los distritos por departamento
    @GetMapping("/distritos/{deparmentId}")
    public ResponseEntity<List<DistrictEntity>> ListDistrictsByDepartment(@PathVariable Long deparmentId){
        return new ResponseEntity<>(this.districtRepository.findByDepartment_Id(deparmentId),HttpStatus.OK);
    }

    //metodo para listar pacientes
    @GetMapping("/listar")
    public ResponseEntity<List<PatientList>>ListAllPatients(){
        try{
            return new ResponseEntity<>(this.patientService.ListAllPatients(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //metodo para listar paciente por dni
    @GetMapping("/buscar/{dni}")
    public ResponseEntity<PatientEntity> ListPatientByDni(@PathVariable String dni){
        if (dni == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.patientRepository.findByDni(dni),HttpStatus.OK);
    }

    //metodo para listar pacientes por id
    @GetMapping("/{id}")
    public ResponseEntity<List<PatientList>> ListPatientById(@PathVariable Long id){
        try {
            return new ResponseEntity<>(this.patientService.ListById(id),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //metodo para listar paciente por user id
    @GetMapping("/listar/{userId}")
    public ResponseEntity<List<PatientList>> ListPatientByUserId(@PathVariable Long userId){
        if (userId == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(this.patientService.ListPatientByUserId(userId),HttpStatus.OK);
    }

    //metodo para actualizar paciente
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<PatientEntity> updatePatient(@PathVariable Long id, @RequestBody @Valid PatientUpdate patientUpdate){
        try{
            return new ResponseEntity<>(this.patientService.updatePatient(id, patientUpdate),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //eliminar el paciente
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id){
        userRepository.deleteById(id);
        patientRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
