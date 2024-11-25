package com.project.integradorII.dto.appointment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentList(
        @NotNull
        Long id,
        @NotNull
        LocalDate date,
        @NotNull
        Long patientId,
        @NotNull
        Long doctorId,
        @NotNull
        LocalTime startTime,
        @NotNull
        LocalTime endTime,
        @NotNull
        Double cost,
        @NotNull
        Long statusId
) {
}
