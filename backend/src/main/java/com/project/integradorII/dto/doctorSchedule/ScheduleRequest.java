package com.project.integradorII.dto.doctorSchedule;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleRequest(
        @NotNull
        Long doctorId,
        @NotNull
        LocalTime startHour,
        @NotNull
        LocalTime endHour,
        @NotNull
        boolean isAvailable
) {
}
