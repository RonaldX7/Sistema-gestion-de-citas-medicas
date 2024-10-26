package com.project.integradorII.services.Imp;

import com.project.integradorII.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImp {

    private final UserRepository userRepository;

    //Metodo para listar todos los usuarios

    //Metodo para crear un usuario

    //Metodo para actualizar un usuario

    //Metodo para borrar un usuario
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
