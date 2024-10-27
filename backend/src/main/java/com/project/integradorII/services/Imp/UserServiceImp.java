package com.project.integradorII.services.Imp;

import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImp implements UserDetailsService {

    private PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    //Metodo para listar todos los usuarios

    //Metodo para crear un usuario

    //Metodo para actualizar un usuario

    //Metodo para borrar un usuario

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
