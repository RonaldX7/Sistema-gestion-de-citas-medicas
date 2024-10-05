package com.project.integradorII.dto.doctor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record DoctorRequest(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotBlank
        String cmp,
        @Valid
        SpecialtyRequest specialty,
        @NotBlank
        String roleName
) {
}
