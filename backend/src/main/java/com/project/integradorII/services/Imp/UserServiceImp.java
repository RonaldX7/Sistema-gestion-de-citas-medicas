package com.project.integradorII.services.Imp;

import com.project.integradorII.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp {

    @Autowired
    private UserRepository userRepository;

    //Metodo para listar todos los usuarios

    //Metodo para crear un usuario

    //Metodo para actualizar un usuario

    //Metodo para borrar un usuario
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
