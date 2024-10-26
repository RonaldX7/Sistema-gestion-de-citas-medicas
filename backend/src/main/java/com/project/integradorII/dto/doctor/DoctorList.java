package com.project.integradorII.dto.doctor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DoctorList(
        @NotNull
        Long id,
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
