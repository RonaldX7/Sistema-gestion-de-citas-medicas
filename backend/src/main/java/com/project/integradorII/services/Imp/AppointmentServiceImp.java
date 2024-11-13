package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.*;
import com.project.integradorII.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImp implements AppointmentService {

    private final SpecialtyRepository specialtyRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public List<AppointmentList> ListAllAppointments() {
        return List.of();
    }

    @Transactional
    @Override
    public MedicalAppointment createAppointment(AppointmentRequest appointmentRequest) {

        //Validar si la especialidad existe
        SpecialtyEntity specialty = specialtyRepository.findById(appointmentRequest.specialtyId())
                .orElseThrow(() -> new IllegalArgumentException("La especialidad no existe"));

        //Validar el costo de la especialidad
        if (specialty.getCost() == null) {
            throw new IllegalArgumentException("La especialidad no tiene costo");
        }

        //Validar si el paciente existe
        PatientEntity patient = patientRepository.findById(appointmentRequest.patientId())
                .orElseThrow(() -> new IllegalArgumentException("El paciente no existe"));

        //Validar si el doctor existe
        DoctorEntity doctor = doctorRepository.findById(appointmentRequest.doctorId())
                .orElseThrow(() -> new IllegalArgumentException("El doctor no existe"));

        //Validar si el horario existe
        DoctorSchedule schedule = scheduleRepository.findById(appointmentRequest.scheduleId())
                .orElseThrow(() -> new IllegalArgumentException("El horario no existe"));

        if (!schedule.isAvialable()) {
            throw new IllegalArgumentException("El horario no esta disponible");
        }

        //Crear la cita medica
        MedicalAppointment appointment = MedicalAppointment.builder()
                .patient(patient)
                .doctor(doctor)
                .date(schedule.getDate())
                .time(schedule.getHourStart())
                .cost(specialty.getCost())
                .build();

        //Guardar la cita medica
        MedicalAppointment saveMedicalAppointment = appointmentRepository.save(appointment);

        //Cambiar el estado del horario
        schedule.setAvialable(false);
        scheduleRepository.save(schedule);


        return saveMedicalAppointment;
    }
}
