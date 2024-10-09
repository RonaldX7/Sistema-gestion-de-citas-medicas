package com.project.integradorII.dto.doctorSchedule;

import com.project.integradorII.entities.DayOfWeek;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleRequest(
        @NotBlank
        Long doctorId,
        @NotBlank
        DayOfWeek days,
        @NotNull
        LocalDate date,
        @NotNull
        LocalTime startHour,
        @NotNull
        LocalTime endHour,
        @NotBlank
        boolean isAvailable
) {
}
