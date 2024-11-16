package com.project.integradorII.services;

import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.MedicalAppointment;

import java.util.List;

public interface AppointmentService {

    List<AppointmentList> ListAllAppointments();
    List<AppointmentList> ListAppointmentBySpecialty(Long specialtyId);
    List<AppointmentList> ListAppointmentByStatus(Long statusId);
    List<AppointmentList> ListAppointmentByDoctor(Long doctorId);
    List<AppointmentList> ListAppointmentByPatient(Long patientId);
    MedicalAppointment createAppointment(AppointmentRequest appointmentRequest);
}
