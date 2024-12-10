package com.project.integradorII.dto.doctor;

import com.project.integradorII.entities.SpecialtyEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DoctorList(
        Long id,
        String name,
        String lastName,
        String phone,
        String cmp,
        String email,
        String specialties
) {
}
