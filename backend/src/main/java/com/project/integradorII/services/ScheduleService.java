package com.project.integradorII.services;

import com.project.integradorII.dto.doctorSchedule.ScheduleList;
import com.project.integradorII.dto.doctorSchedule.ScheduleRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.entities.DoctorSchedule;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    //Metodo para listar los horarios por medico y fecha
    public List<ScheduleList> getScheduleByDoctorAndDate(Long doctorId, LocalDate date) {

        List<DoctorSchedule> doctorSchedules = scheduleRepository.findByDoctorIdAndDate(doctorId, date);

        //Mapear la lista de horarios
        List<ScheduleList> scheduleLists = doctorSchedules.stream().map(doctorSchedule -> {
            return new ScheduleList(
                    doctorSchedule.getId(),
                    doctorSchedule.getDay(),
                    doctorSchedule.getDate(),
                    doctorSchedule.getHour_start(),
                    doctorSchedule.getHour_end(),
                    doctorSchedule.isAvialable()
            );
        }).collect(Collectors.toList());

        return scheduleLists;
    }

    //Metodo para registrar el horario de un medico
    public DoctorSchedule createSchedule(ScheduleRequest scheduleRequest) {

        //Validar si el medico existe
        DoctorEntity medico = doctorRepository.findById(scheduleRequest.doctorId())
                .orElseThrow(() -> new RuntimeException("El medico no existe"));

        //Validar si el horario es correcto
        validateSchedule(scheduleRequest);

        //crear un nuevo horario
        DoctorSchedule doctorSchedule = DoctorSchedule.builder()
                .day(scheduleRequest.days())
                .date(scheduleRequest.date())
                .hour_start(scheduleRequest.startHour())
                .hour_end(scheduleRequest.endHour())
                .isAvialable(scheduleRequest.isAvailable())
                .build();

        //Asignar el medico al horario
        doctorSchedule.getDoctors().add(medico);

        //Guardar el horario
        return scheduleRepository.save(doctorSchedule);
    }

    //Metodo para validar el horario
    private void validateSchedule(ScheduleRequest scheduleRequest) {
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorIdAndDate(scheduleRequest.doctorId(), scheduleRequest.date());
        if (scheduleRequest.startHour().isAfter(scheduleRequest.endHour())) {
            throw new RuntimeException("La hora de inicio no puede ser mayor a la hora de fin");
        }
    }

    //Metodo para actualizar un horario

    //Metodo para eliminar un horario
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }
}
