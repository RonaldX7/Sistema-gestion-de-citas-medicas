package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.appointment.AppointmentList;
import com.project.integradorII.dto.appointment.AppointmentRequest;
import com.project.integradorII.entities.MedicalAppointment;
import com.project.integradorII.repositories.AppointmentRepository;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImp implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public List<AppointmentList> ListAllAppointments() {
        return List.of();
    }

    @Override
    public MedicalAppointment createAppointment(AppointmentRequest appointmentRequest) {
        return null;
    }
}
