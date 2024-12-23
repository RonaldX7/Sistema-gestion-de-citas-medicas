package com.project.integradorII.security;

import com.project.integradorII.security.filter.JwtValidator;
import com.project.integradorII.security.util.JwtUtils;
import com.project.integradorII.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationProvider authenticationProvider, JwtUtils jwtUtils) throws Exception {
        return httpSecurity
                .cors(corsConfigurer -> corsConfigurer.configurationSource(request -> {
                    var cors = new org.springframework.web.cors.CorsConfiguration();
                    cors.setAllowedOrigins(List.of("http://localhost:4200"));
                    cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                    cors.setAllowedHeaders(List.of("*"));
                    cors.setAllowCredentials(true);
                    return cors;
                }))
                .csrf(csrfConfigurer -> csrfConfigurer.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {

                    //configurar los endpoints publicos
                    http.requestMatchers(HttpMethod.POST, "/auth/**").permitAll();

                    //Endpoints del paciente
                    http.requestMatchers(HttpMethod.GET, "/paciente/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/paciente/listar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/paciente/departamentos").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/paciente/distritos/{deparmentId}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/paciente/buscar/{dni}").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/paciente/actualizar/{id}").permitAll();

                    //Endpoints del medico
                    http.requestMatchers(HttpMethod.GET, "/especialidades/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/medico/{userId}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/medico/listar/{specialty_id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/medico/registrar").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/medico/actualizar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/horarios/registrar").permitAll();

                    //Endpoints de las citas medicas
                    http.requestMatchers(HttpMethod.GET, "/horarios/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/horarios/listar/{doctorId}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/cita/estados").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/cita/registrar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/cita/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/cita/listar/{statusId}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/cita/doctor/{doctor_id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/cita/paciente/{patient_id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/cita/diagnostico/{appoinmentId}").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/cita/reprogramar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/cita/cancelar/{id}/{statusId}").permitAll();

                    //Endpoints del administrador

                    http.anyRequest().denyAll();
                })
                .addFilterBefore(new JwtValidator(jwtUtils), BasicAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserService userService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
