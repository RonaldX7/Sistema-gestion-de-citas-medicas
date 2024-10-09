package com.project.integradorII.repositories;

import com.project.integradorII.entities.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    @Query("SELECT s FROM DoctorSchedule s WHERE s.doctors = :doctorId AND s.date = :date")
    List<DoctorSchedule> findByDoctorIdAndDate(Long doctorId, LocalDate date);
}
