package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PatientUpdate(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String address,
        @NotNull
        Long districtId,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
