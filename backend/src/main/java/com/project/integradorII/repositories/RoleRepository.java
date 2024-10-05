package com.project.integradorII.repositories;

import com.project.integradorII.entities.RoleEntity;
import com.project.integradorII.entities.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {

    Optional<RoleEntity> findRoleEntitiesByRoleEnum(RoleEnum roleName);
}
