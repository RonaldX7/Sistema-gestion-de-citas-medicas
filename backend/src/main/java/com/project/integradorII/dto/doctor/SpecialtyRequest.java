package com.project.integradorII.dto.doctor;

import jakarta.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
public record SpecialtyRequest(

        @Size(max = 3, message = "El usuario no puede tener mas de 3 especialidades")
        List<String> specialtyListName
) {
}
