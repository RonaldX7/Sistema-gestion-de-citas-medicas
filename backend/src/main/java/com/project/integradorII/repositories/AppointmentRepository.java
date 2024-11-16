package com.project.integradorII.repositories;

import com.project.integradorII.entities.MedicalAppointment;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<MedicalAppointment, Long> {

    //buscar las citas por especialidad
    @Query("SELECT a FROM MedicalAppointment a JOIN a.doctor d WHERE d.specialties = :specialty_id")
    Page<MedicalAppointment> findBySpecialtyId(@Param("specialty_id") Long specialtyId);

    //buscar las citas por estado
    Page<MedicalAppointment> findByStatusId(Long statusId);

    //Buscar las citas por el id del doctor
    Page<MedicalAppointment> findByDoctorId(Long doctorId);

    //Buscar las citas por el id del paciente
    Page<MedicalAppointment> findByPatientId(Long patientId);

    //Verificar si el paciente ya tiene una cita en la fecha y hora seleccionada
    boolean existsByDateAndAndStartTimeAndAndEndTime(LocalDate date, LocalTime startTime, LocalTime endTime);

}
