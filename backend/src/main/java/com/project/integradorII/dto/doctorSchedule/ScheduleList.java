package com.project.integradorII.dto.doctorSchedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record ScheduleList(
        Long id,
        LocalTime startHour,
        LocalTime endHour,
        boolean isAvailable
) {
}
