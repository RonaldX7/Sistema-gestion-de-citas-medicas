package com.proyecto.soa.services;

import com.proyecto.soa.dtos.UserUpdateDTO;
import com.proyecto.soa.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserService {
    Page<User> findAll(Pageable pageable);
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    Optional<User> update(UserUpdateDTO user, Long id);
}
