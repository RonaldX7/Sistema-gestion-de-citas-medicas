package com.project.integradorII.dto.doctor;

import org.springframework.validation.annotation.Validated;

import java.util.Set;

@Validated
public record SpecialtyRequest(

    Set<String> specialtyListName
) {
}
