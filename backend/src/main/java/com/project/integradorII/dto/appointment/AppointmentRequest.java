package com.project.integradorII.dto.appointment;


public record AppointmentRequest(
        Long patientId,
        Long specialtyId,
        Long doctorId,
        Long scheduleId
) {
}
