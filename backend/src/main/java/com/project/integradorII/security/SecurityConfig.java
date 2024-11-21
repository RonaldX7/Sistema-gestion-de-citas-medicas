package com.project.integradorII.security;

import com.project.integradorII.security.filter.JwtValidator;
import com.project.integradorII.security.util.JwtUtils;
import com.project.integradorII.services.Imp.UserServiceImp;
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
                    http.requestMatchers(HttpMethod.GET, "/paciente/listar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/especialidades/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/medico/listar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/horarios/listar/{doctorId}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/cita/registrar").permitAll();
                    http.requestMatchers(HttpMethod.PUT, "/paciente/actualizar/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/medico/registrar").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/horarios/registrar").permitAll();
                    //configurar los endpoints privados
                    //Endpoints del paciente
                    http.requestMatchers(HttpMethod.DELETE, "/paciente/eliminar/{id}").hasAnyRole("USER");

                    //Endpoints del medico
                    http.requestMatchers(HttpMethod.PUT, "/medico/actualizar/{id}").hasAnyRole("MEDICO");
                    http.requestMatchers(HttpMethod.DELETE, "/medico/eliminar/{id}").hasAnyRole("MEDICO");

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
    public AuthenticationProvider authenticationProvider(UserServiceImp userServiceImp) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userServiceImp);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
