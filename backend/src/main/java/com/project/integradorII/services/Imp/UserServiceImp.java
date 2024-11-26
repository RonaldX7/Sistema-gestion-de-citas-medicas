package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.LoginRequest;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.password.PasswordUpdateRequest;
import com.project.integradorII.entities.HistoryRecuperation;
import com.project.integradorII.entities.PatientEntity;
import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.UserEntity;
import com.project.integradorII.repositories.PatientRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.security.util.JwtUtils;
import com.project.integradorII.services.EmailService;
import com.project.integradorII.services.HistoryRecuperationRepository;
import com.project.integradorII.services.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utilitarian.RandomCodeGenerator;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class UserServiceImp implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final PatientRepository patientRepository;

    private RandomCodeGenerator randomCodeGenerator;

    private final EmailService emailService;

    private final HistoryRecuperationRepository historyRecuperationRepository;

    //Metodo que busca el usuario en la base de datos
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntity = userRepository.findUserEntitiesByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario no existe"));

        SimpleGrantedAuthority authorityList = new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().getRoleEnum().name()));

        return new User(userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.isEnabled(),
                userEntity.isAccountNoExpired(),
                userEntity.isCredentialNoExpired(),
                userEntity.isAccountNoLocked(),
                Collections.singleton(authorityList));
    }

    //Metodo para logearse
    @Transactional
    @Override
    public AuthResponse loginUser(LoginRequest loginRequest){

        String username  = loginRequest.username();
        String password = loginRequest.password();

        //Obtener el usuario por el nombre de usuario
        UserEntity userEntity = userRepository.findUserEntitiesByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("El usuario no existe"));

        //Verificar si el usuario esta habilitado
        if(!userEntity.isEnabled()){
            throw new BadCredentialsException("Usuario deshabilitado");
        }

        Authentication authentication = this.authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.createToken(authentication);

        AuthResponse authResponse = new AuthResponse( userEntity.getId(), username, "Usuario logeado correctamente", token, true);
        return authResponse;
    }


    //Metodo que se encarga de verificar si las credenciales son correctas
    @Transactional
    @Override
    public Authentication authenticate(String username, String password){

        UserDetails userDetails = this.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Usuario no encontrado");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Contraseña incorrecta");
        }
        return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
    }

    //metodo para crear un usuario
    @Transactional
    @Override
    public UserEntity createUser(UserRequest userRequest){

        //Asignar el rol al paciente
        RoleEntity roleEntity = roleRepository.findById(userRequest.roleId())
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Crear el usuario
        UserEntity userEntity = UserEntity.builder()
                .username(userRequest.username())
                .password(passwordEncoder.encode(userRequest.password()))
                .role(roleEntity)
                .isEnabled(true)
                .accountNoExpired(true)
                .accountNoLocked(true)
                .credentialNoExpired(true)
                .build();

        UserEntity userCreated = userRepository.save(userEntity);

        //Asignar el rol al usuario
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_".concat(userCreated.getRole().getRoleEnum().name()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(userCreated.getUsername(), userCreated.getPassword(), Collections.singleton(authority));

        String accessToken = jwtUtils.createToken(authentication);

        AuthResponse authResponse = new AuthResponse(userCreated.getId(), userCreated.getUsername(), "Usuario creado correctamente", accessToken, true);

        return userCreated;
    }

    //Metodo para recuperar la contraseña
    @Transactional
    @Override
    public Map<String, String> recuperarContrasena(String email) throws IOException, MessagingException {

        //validar si el paciente existe
        PatientEntity patientEntity = patientRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("El paciente no existe"));

        String code =randomCodeGenerator.generateRandomCode(5);

        String content = stringHtml("templates/EmailRecuperacion.html")
                .replace("{code}", code);

        //Guardar el codigo de recuperacion
        HistoryRecuperation historyRecuperation = new HistoryRecuperation();
        historyRecuperation.setCode(code);
        historyRecuperation.setUser(patientEntity.getUser());
        historyRecuperationRepository.save(historyRecuperation);

        emailService.sendMail(email, "Recuperar contraseña", content);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Se ha enviado un correo a su dirección de correo electrónico");
        return response;
    }

    //Metodo para cambiar la contraseña
    @Transactional
    @Override
    public ResponseEntity<?> cambiarContrasena(PasswordUpdateRequest passwordUpdate) {
        //Verificar si el codigo es correcto
        HistoryRecuperation codeData = historyRecuperationRepository.findByCode(passwordUpdate.code());

        Map<String, String> response = new HashMap<>();
        if (codeData == null || !codeData.getCode().equals(passwordUpdate.code())) {
            response.put("message", "El código no es correcto");
            return ResponseEntity.status(400).body(response);
        }

        //Obtener el usuario
        Optional<UserEntity> userUpdatePassword = userRepository.findById(codeData.getUser().getId());
        if (userUpdatePassword == null) {
            return ResponseEntity.badRequest().body("El usuario no existe");
        }

        //Actualizar la contraseña
        userUpdatePassword.get().setPassword(passwordEncoder.encode(passwordUpdate.password()));
        userRepository.save(userUpdatePassword.get());

        //Eliminar el codigo de recuperacion
        historyRecuperationRepository.delete(codeData);

        response.put("message", "Se ha actualizado la contraseña");

        return ResponseEntity.ok(response);
    }

    private static String stringHtml(String resourcePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(resourcePath);
        try (InputStream inputStream = resource.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        }
    }
}
