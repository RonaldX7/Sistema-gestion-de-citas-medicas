package com.project.integradorII.repositories;

import com.project.integradorII.entities.DoctorSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findByDoctors_Id(Long doctorId);

    Optional<DoctorSchedule> findByDoctors_IdAndHourStartAndHourEnd(Long doctorId, LocalTime hourStart, LocalTime hourEnd);

    List<DoctorSchedule> findByDoctors_IdAndAvailableIs(Long doctorId, Boolean available);
}
