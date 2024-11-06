package com.project.integradorII.dto.authentication;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"username", "message", "jwt", "status"})
public record AuthResponse(
        Long userId,
        String username,
        String message,
        String jwt,
        boolean status
) {
}
