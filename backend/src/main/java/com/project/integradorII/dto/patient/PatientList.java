package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PatientList(
        @NotNull
        Long id,
        @NotBlank
        String dni,
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        Long genderId,
        @NotBlank
        String email
        ) {
}
