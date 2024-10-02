package com.project.integradorII.dto.doctor;

public record DoctorRequest(
        String name,
        String lastName,
        String phone,
        String email,
        String username,
        String password,
        String cmp,
        SpecialtyRequest specialty,
        Long roleId
) {
}
