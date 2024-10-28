package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PatientCreate(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String dni,
        @NotNull(message = "birthDate is required")
        LocalDate birthDate,
        @NotBlank
        String direction,
        @NotNull
        Long genderId,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotNull
        Long roleId
) {
}
