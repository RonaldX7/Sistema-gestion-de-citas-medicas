package com.project.integradorII.services;

import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.dto.appointment.AppointmentUpdate;
import com.project.integradorII.dto.appointment.DiagnosisRequest;
import com.project.integradorII.entities.MedicalAppointment;
import com.project.integradorII.entities.MedicalDiagnosis;

import java.util.List;

public interface AppointmentService {

    List<AppointmentList> ListAllAppointments();
    List<AppointmentList> ListAppointmentByStatus(Long statusId);
    List<AppointmentList> ListAppointmentByDoctor(Long doctorId);
    List<AppointmentList> ListAppointmentByPatient(Long patientId);
    MedicalAppointment createAppointment(AppointmentRequest appointmentRequest);
    MedicalAppointment updateAppointment(Long id, AppointmentUpdate appointmentUpdate);
    MedicalDiagnosis createDiagnosis(Long appointmentId, DiagnosisRequest diagnosisRequest);
    void cancelAppointment(Long id, Long statusId);
}
