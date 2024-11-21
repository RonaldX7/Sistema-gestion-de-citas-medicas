package com.project.integradorII.dto.doctorSchedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleList(
        @NotBlank
        Long doctorId,
        @NotNull
        LocalTime startHour,
        @NotNull
        LocalTime endHour,
        @NotBlank
        boolean isAvailable
) {
}
