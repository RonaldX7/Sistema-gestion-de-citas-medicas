package com.project.integradorII.dto.doctor;

import org.springframework.validation.annotation.Validated;

import java.util.List;

@Validated
public record SpecialtyRequest(

    List<String> specialtyListName
) {
}
