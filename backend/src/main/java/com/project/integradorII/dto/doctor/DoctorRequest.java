package com.project.integradorII.dto.doctor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

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
        @NotNull
        String specialty,
        @NotNull
        List<Long> schedulesIds,
        @NotNull
        Long roleId
) {
}
