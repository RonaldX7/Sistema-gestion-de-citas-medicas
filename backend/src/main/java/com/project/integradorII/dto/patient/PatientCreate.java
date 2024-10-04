package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record PatientCreate(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String dni,
        @NotBlank
        Date birthDate,
        @NotBlank
        String direction,
        @NotBlank
        String gender,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotBlank
        String roleName
) {
}
