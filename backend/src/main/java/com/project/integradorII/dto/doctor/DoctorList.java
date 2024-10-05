package com.project.integradorII.dto.doctor;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DoctorList(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        String phone,
        @NotBlank
        String cmp,
        @NotBlank
        List<String> specialties
) {
}
