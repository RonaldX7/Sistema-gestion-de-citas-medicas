package com.project.integradorII.repositories;

import com.project.integradorII.entities.MedicalAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<MedicalAppointment, Long> {

}
