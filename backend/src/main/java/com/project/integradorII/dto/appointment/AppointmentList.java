package com.project.integradorII.dto.appointment;

import jakarta.validation.constraints.NotNull;

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
        @NotNull
        Long statusId,
        String status
) {
}
