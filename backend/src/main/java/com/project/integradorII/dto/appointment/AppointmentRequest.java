package com.project.integradorII.dto.appointment;


import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AppointmentRequest(
        @NotNull
        LocalDate date,
        @NotNull
        Long patientId,
        @NotNull
        Long specialtyId,
        @NotNull
        Long doctorId,
        @NotNull
        Long scheduleId,
        @NotNull
        Long statusId
) {
}
