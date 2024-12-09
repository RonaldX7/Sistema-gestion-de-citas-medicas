package com.project.integradorII.dto.doctor;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DoctorUpdate(
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
        List<Long> schedulesIds,
        @NotBlank
        String password
) {
}
