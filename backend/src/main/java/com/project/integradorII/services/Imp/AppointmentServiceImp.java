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
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImp implements AppointmentService {

    private final SpecialtyRepository specialtyRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ScheduleRepository scheduleRepository;
    private final AppointmentStatusRepository appointmentStatusRepository;
    private final AppointmentCostRepository appointmentCostRepository;

    private List<AppointmentList> getAppointmentLists(Stream<MedicalAppointment> stream, List<MedicalAppointment> appointments) {
        List<AppointmentList> appointmentLists = stream
                .map(appointment -> {
                    return new AppointmentList(
                            appointment.getId(),
                            appointment.getDate(),
                            appointment.getPatient().getId(),
                            appointment.getDoctor().getId(),
                            appointment.getStartTime(),
                            appointment.getEndTime(),
                            appointment.getCost().getCost(),
                            appointment.getStatus().getId()
                    );
                }).collect(java.util.stream.Collectors.toList());

        return appointmentLists;
    }


    @Transactional
    @Override
    public List<AppointmentList> ListAllAppointments() {

        List<MedicalAppointment> appointments = appointmentRepository.findAll();

        return getAppointmentLists(appointments.stream(), appointments);

    }

    @Transactional
    @Override
    public List<AppointmentList> ListAppointmentByStatus(Long statusId) {

        List<MedicalAppointment> appointments = appointmentRepository.findByStatusId(statusId);

        return getAppointmentLists(appointments.stream(), appointments);
    }

    @Override
    public List<AppointmentList> ListAppointmentByDoctor(Long doctorId) {

        List<MedicalAppointment> appointments = appointmentRepository.findByDoctorId(doctorId);

        return getAppointmentLists(appointments.stream(), appointments);
    }

    @Override
    public List<AppointmentList> ListAppointmentByPatient(Long patientId) {
        List<MedicalAppointment> appointments = appointmentRepository.findByPatientId(patientId);

        return getAppointmentLists(appointments.stream(), appointments);
    }

    @Transactional
    @Override
    public MedicalAppointment createAppointment(AppointmentRequest appointmentRequest) {

        //Estado de la cita
        AppointmentStatus appointmentStatus = appointmentStatusRepository.findById(appointmentRequest.statusId())
                .orElseThrow(() -> new IllegalArgumentException("El estado de la cita no existe"));

        //Validar si la especialidad existe
        SpecialtyEntity specialty = specialtyRepository.findById(appointmentRequest.specialtyId())
                .orElseThrow(() -> new IllegalArgumentException("La especialidad no existe"));

        //Validar el costo de la especialidad
        AppointmentCosts appointmentCosts = appointmentCostRepository.findBySpecialtyId(appointmentRequest.specialtyId())
                .orElseThrow(() -> new IllegalArgumentException("La especialidad no tiene costo"));

        //Validar si el paciente existe
        PatientEntity patient = patientRepository.findById(appointmentRequest.patientId())
                .orElseThrow(() -> new IllegalArgumentException("El paciente no existe"));

        //Validar si el doctor existe
        DoctorEntity doctor = doctorRepository.findById(appointmentRequest.doctorId())
                .orElseThrow(() -> new IllegalArgumentException("El doctor no existe"));

        //Validar si el horario existe
        DoctorSchedule schedule = scheduleRepository.findById(appointmentRequest.scheduleId())
                .orElseThrow(() -> new IllegalArgumentException("El horario no existe"));

        if (!schedule.isAvailable()) {
            throw new IllegalArgumentException("El horario no esta disponible");
        }

        //Verificar que no exista una cita en la misma fecha y horario
        if (appointmentRepository
                .existsByDateAndAndStartTimeAndAndEndTime(appointmentRequest.date(), schedule.getHourStart(), schedule.getHourEnd())) {
            throw new IllegalArgumentException("Ya existe una cita en la misma fecha y hora");
        }

        //Crear la cita medica
        MedicalAppointment appointment = MedicalAppointment.builder()
                .patient(patient)
                .doctor(doctor)
                .date(appointmentRequest.date())
                .startTime(schedule.getHourStart())
                .endTime(schedule.getHourEnd())
                .cost(appointmentCosts)
                .status(appointmentStatus)
                .build();

        //Guardar la cita medica
        MedicalAppointment saveMedicalAppointment = appointmentRepository.save(appointment);

        return saveMedicalAppointment;
    }
}
