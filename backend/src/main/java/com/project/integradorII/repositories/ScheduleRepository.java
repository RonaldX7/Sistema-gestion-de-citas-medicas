package com.project.integradorII.repositories;

import com.project.integradorII.entities.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findByDoctors_IdAndDate(Long doctorId, LocalDate date);

    Optional<DoctorSchedule> findByDoctors_IdAndDateAndHourStartAndHourEnd(Long doctorId, LocalDate date, LocalTime hourStart, LocalTime hourEnd);
}
