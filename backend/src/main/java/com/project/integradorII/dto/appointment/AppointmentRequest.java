package com.project.integradorII.dto.appointment;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(
        Long patientId,
        Long doctorId,
        Long costId,
        LocalDate date,
        LocalTime time,
        Long statusId
) {
}
