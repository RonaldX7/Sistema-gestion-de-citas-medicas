package com.project.integradorII.dto.patient;

import com.project.integradorII.entities.AddressEntity;
import jakarta.validation.constraints.NotBlank;

public record PatientUpdate(
        @NotBlank
        String name,
        @NotBlank
        String lastName,
        @NotBlank
        AddressEntity address,
        @NotBlank
        String phone,
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
