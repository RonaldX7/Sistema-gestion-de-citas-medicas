package com.project.integradorII.dto.appointment;

import java.time.LocalDate;

public record AppointmentUpdate(
        LocalDate date,
        Long scheduleId
) {
}
