package com.project.integradorII.services;

import com.project.integradorII.dto.doctorSchedule.ScheduleList;
import com.project.integradorII.dto.doctorSchedule.ScheduleRequest;
import com.project.integradorII.entities.DoctorSchedule;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {

    List<ScheduleList> getAvaiableSchedulesByDoctor(Long doctorId);
    //List<ScheduleList> getScheduleByDoctorAndDate(Long doctorId, LocalDate date);
    DoctorSchedule createSchedule(ScheduleRequest scheduleRequest);
    void validateSchedule(ScheduleRequest scheduleRequest);
    DoctorSchedule updateSchedule(Long id, ScheduleRequest scheduleRequest);
    void deleteSchedule(Long id);
}
