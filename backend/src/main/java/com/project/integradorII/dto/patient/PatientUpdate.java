package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;

public record PatientUpdate(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String direction,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
