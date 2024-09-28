package com.project.integradorII.repositories;

import com.project.integradorII.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<RoleEntity,Long> {
}
