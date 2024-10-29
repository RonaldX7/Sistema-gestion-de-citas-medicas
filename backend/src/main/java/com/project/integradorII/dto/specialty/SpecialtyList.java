package com.project.integradorII.dto.specialty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SpecialtyList(
        @NotNull
        Long id,
        @NotBlank
        String name
) {
}
