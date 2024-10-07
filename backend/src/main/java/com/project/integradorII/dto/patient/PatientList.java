package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;

public record PatientList(
        @NotBlank
        String dni,
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String gender,
        @NotBlank
        String email
        ) {
}
