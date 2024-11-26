package com.project.integradorII.repositories;

import aj.org.objectweb.asm.Opcodes;
import com.project.integradorII.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findById(Long id);

    Optional<UserEntity> findUserEntitiesByUsername(String username);

    @Modifying
    @Query("UPDATE UserEntity u SET u.password = :password WHERE u.id = :userId")
    void updatePassword(String password, Long userId);
}
