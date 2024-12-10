package com.project.integradorII.dto.appointment;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentList(
        Long id,
        LocalDate date,
        Long patientId,
        Long doctorId,
        LocalTime startTime,
        LocalTime endTime,
        Double cost,
        Long statusId,
        String status
) {
}
