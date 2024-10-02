package com.project.integradorII.repositories;

import com.project.integradorII.entities.SpecialtyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialtyRepository extends JpaRepository<SpecialtyEntity, Long> {

    List<SpecialtyEntity> findSpecialtyEntitiesByNameIn(List<String> specialtyListName);

}
