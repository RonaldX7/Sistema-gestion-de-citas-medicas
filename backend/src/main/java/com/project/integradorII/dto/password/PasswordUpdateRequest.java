package com.project.integradorII.dto.password;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordUpdateRequest(
        @NotNull(message = "La contraseña es requerida")
        @NotBlank(message = "La contraseña no puede tener espacios en blanco")
        @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
                message = "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
        String password,
        @NotNull(message = "Escriba la contraseña nuevamente")
        String validPassword,
        @NotNull
        String code
) {
}
