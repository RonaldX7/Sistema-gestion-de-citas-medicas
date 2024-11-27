package com.project.integradorII.dto.doctorSchedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record ScheduleList(
        @NotBlank
        Long id,
        @NotNull
        LocalTime startHour,
        @NotNull
        LocalTime endHour,
        @NotBlank
        boolean isAvailable
) {
}
