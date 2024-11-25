package com.project.integradorII.repositories;

import com.project.integradorII.entities.SpecialtyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpecialtyRepository extends JpaRepository<SpecialtyEntity, Long> {

    SpecialtyEntity findByName(String specialtyName);

    List<SpecialtyEntity> findSpecialtyEntitiesByNameIn(List<String> specialtyListName);

}
