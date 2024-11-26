package com.project.integradorII.services;

import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.LoginRequest;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.password.PasswordUpdateRequest;
import com.project.integradorII.entities.UserEntity;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.Map;

public interface UserService {
    UserDetails loadUserByUsername(String username);
    AuthResponse loginUser(LoginRequest loginRequest);
    Authentication authenticate(String username, String password);
    UserEntity createUser(UserRequest userRequest);
    Map<String, String> recuperarContrasena(String email) throws IOException, MessagingException;
    ResponseEntity<?> cambiarContrasena(PasswordUpdateRequest passwordUpdate);
}
