package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.authentication.AuthResponse;
import com.project.integradorII.dto.authentication.LoginRequest;
import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.UserEntity;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.UserRepository;
import com.project.integradorII.security.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;


@RequiredArgsConstructor
@Service
public class UserServiceImp implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    //Metodo que busca el usuario en la base de datos
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
    public AuthResponse loginUser(LoginRequest loginRequest){
        String username  = loginRequest.username();
        String password = loginRequest.password();

        Authentication authentication = this.authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.createToken(authentication);

        AuthResponse authResponse = new AuthResponse(username, "Usuario logeado correctamente", token, true);
        return authResponse;
    }


    //Metodo que se encarga de verificar si las credenciales son correctas
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
    public AuthResponse createUser(UserRequest userRequest){

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

        AuthResponse authResponse = new AuthResponse(userCreated.getUsername(), "Usuario creado correctamente", accessToken, true);
        return authResponse;
    }
}
