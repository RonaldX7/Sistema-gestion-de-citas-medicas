package com.project.integradorII.dto.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PatientList(
        Long id,
        String dni,
        String name,
        String lastName,
        String address,
        Long genderId,
        Long districtId,
        String phone,
        String email
        ) {
}
