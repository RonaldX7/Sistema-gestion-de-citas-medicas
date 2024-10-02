package com.project.integradorII.dto.doctor;

import com.project.integradorII.entities.RoleEnum;

public record DoctorRequest(
        String name,
        String lastName,
        String phone,
        String email,
        String username,
        String password,
        String cmp,
        SpecialtyRequest specialty,
        String roleName
) {
}
