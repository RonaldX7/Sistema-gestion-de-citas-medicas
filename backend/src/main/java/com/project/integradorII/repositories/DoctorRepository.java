package com.project.integradorII.repositories;

import com.project.integradorII.entities.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorEntity, Long> {

    List<DoctorEntity> findDoctorEntitiesBySpecialties_Id(Long id);

    //Listar Doctor por user_id
    DoctorEntity findDoctorEntitiesByUserId(Long userId);

}
