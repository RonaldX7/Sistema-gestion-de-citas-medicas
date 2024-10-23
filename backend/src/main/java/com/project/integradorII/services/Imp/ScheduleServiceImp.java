package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.doctorSchedule.ScheduleList;
import com.project.integradorII.dto.doctorSchedule.ScheduleRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.entities.DoctorSchedule;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImp {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    //Metodo para listar los horarios por medico y fecha
    public List<ScheduleList> getScheduleByDoctorAndDate(Long doctorId, LocalDate date) {

        List<DoctorSchedule> doctorSchedules = scheduleRepository.findByDoctors_IdAndDate(doctorId, date);

        //Mapear la lista de horarios
        List<ScheduleList> scheduleLists = doctorSchedules.stream().map(doctorSchedule -> {
            return new ScheduleList(
                    doctorSchedule.getId(),
                    doctorSchedule.getDate(),
                    doctorSchedule.getHourStart(),
                    doctorSchedule.getHourEnd(),
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
                .date(scheduleRequest.date())
                .hourStart(scheduleRequest.startHour())
                .hourEnd(scheduleRequest.endHour())
                .isAvialable(scheduleRequest.isAvailable())
                .build();

        //Asignar el medico al horario
        if (doctorSchedule.getDoctors() == null) {
            doctorSchedule.setDoctors(new HashSet<>()); // Inicializar la lista de doctores
        }
        doctorSchedule.getDoctors().add(medico);

        //Guardar el horario
        return scheduleRepository.save(doctorSchedule);
    }

    //Metodo para validar el horario
    private void validateSchedule(ScheduleRequest scheduleRequest) {
        Optional<DoctorSchedule> doctorSchedule = scheduleRepository
                .findByDoctors_IdAndDateAndHourStartAndHourEnd
                        (scheduleRequest.doctorId(), scheduleRequest.date(), scheduleRequest.startHour(), scheduleRequest.endHour());
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctors_IdAndDate(scheduleRequest.doctorId(), scheduleRequest.date());

        if (doctorSchedule.isPresent()) {
            throw new RuntimeException("El horario ya existe");
        }
        if (scheduleRequest.startHour().isAfter(scheduleRequest.endHour())) {
            throw new RuntimeException("La hora de inicio no puede ser mayor a la hora de fin");
        }
        if (schedules.stream().anyMatch(schedule -> schedule.getHourStart().isBefore(scheduleRequest.startHour()) && schedule.getHourEnd().isAfter(scheduleRequest.startHour()))) {
            throw new RuntimeException("El horario se cruza con otro horario");
        }
    }

    //Metodo para actualizar un horario
    public DoctorSchedule updateSchedule(Long id, ScheduleRequest scheduleRequest) {
        //Validar si el horario existe
        DoctorSchedule doctorSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El horario no existe"));

        //Validar si el horario es correcto
        validateSchedule(scheduleRequest);

        //Actualizar el horario
        doctorSchedule.setDate(scheduleRequest.date());
        doctorSchedule.setHourStart(scheduleRequest.startHour());
        doctorSchedule.setHourEnd(scheduleRequest.endHour());
        doctorSchedule.setAvialable(scheduleRequest.isAvailable());

        //Guardar el horario
        return scheduleRepository.save(doctorSchedule);
    }

    //Metodo para eliminar un horario
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
