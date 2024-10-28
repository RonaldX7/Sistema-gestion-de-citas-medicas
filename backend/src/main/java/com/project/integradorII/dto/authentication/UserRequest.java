package com.project.integradorII.dto.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequest(
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotNull
        Long roleId
) {
}
