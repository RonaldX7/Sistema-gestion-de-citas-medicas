package com.project.integradorII.repositories;

import com.project.integradorII.entities.DoctorSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findByDoctors_Id(Long doctorId);

    Optional<DoctorSchedule> findByDoctors_IdAndHourStartAndHourEnd(Long doctorId, LocalTime hourStart, LocalTime hourEnd);

    List<DoctorSchedule> findByDoctors_IdAndAvailableIs(Long doctorId, Boolean available);

    //asignar horario a doctor
    @Modifying
    @Query(value = "INSERT INTO tb_doctor_schedule (doctor_id, schedule_id) VALUES (:doctorId, :scheduleId)", nativeQuery = true)
    void assignScheduleToDoctor(Long doctorId, Long scheduleId);

    //actualizar horario de un doctor
    @Modifying
    @Query(value = "UPDATE tb_doctor_schedule SET schedule_id = :scheduleId WHERE doctor_id = :doctorId", nativeQuery = true)
    void updateScheduleToDoctor(Long doctorId, Long scheduleId);


    //eliminar horario de doctor
    @Modifying
    @Query(value = "DELETE FROM tb_doctor_schedule WHERE doctor_id = :doctorId AND schedule_id = :scheduleId", nativeQuery = true)
    void deleteScheduleToDoctor(Long doctorId, Long scheduleId);
}
