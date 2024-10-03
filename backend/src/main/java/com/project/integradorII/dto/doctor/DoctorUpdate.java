package com.project.integradorII.dto.doctor;

import jakarta.validation.constraints.NotBlank;

public record DoctorUpdate(
        @NotBlank
        Long id,
        @NotBlank
        String cmp,
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
