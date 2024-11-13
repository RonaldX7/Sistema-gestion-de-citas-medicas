package com.project.integradorII.services;

import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.MedicalAppointment;

import java.util.List;

public interface AppointmentService {

    List<AppointmentList> ListAllAppointments();

    MedicalAppointment createAppointment(AppointmentRequest appointmentRequest);
}
