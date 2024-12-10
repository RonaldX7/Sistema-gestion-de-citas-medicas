package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.doctorSchedule.ScheduleList;
import com.project.integradorII.dto.doctorSchedule.ScheduleRequest;
import com.project.integradorII.entities.DoctorEntity;
import com.project.integradorII.entities.DoctorSchedule;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.ScheduleRepository;
import com.project.integradorII.services.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImp implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final DoctorRepository doctorRepository;

    @Override
    public List<ScheduleList> getAllSchedules() {
        List<DoctorSchedule> doctorSchedules = scheduleRepository.findAll();

        //Mapear la lista de horarios
        List<ScheduleList> scheduleLists = doctorSchedules.stream().map(doctorSchedule -> {
            return new ScheduleList(
                    doctorSchedule.getId(),
                    doctorSchedule.getHourStart(),
                    doctorSchedule.getHourEnd(),
                    doctorSchedule.isAvailable()
            );
        }).collect(Collectors.toList());

        return scheduleLists;
    }

    //Metodo para listar los horarios por medico
    @Transactional
    @Override
    public List<ScheduleList> getAvaiableSchedulesByDoctor(Long doctorId) {

        List<DoctorSchedule> doctorSchedules = scheduleRepository.findByDoctors_IdAndAvailableIs(doctorId, true);

        //Mapear la lista de horarios
        List<ScheduleList> scheduleLists = doctorSchedules.stream().map(doctorSchedule -> {
            return new ScheduleList(
                    doctorSchedule.getId(),
                    doctorSchedule.getHourStart(),
                    doctorSchedule.getHourEnd(),
                    doctorSchedule.isAvailable()
            );
        }).collect(Collectors.toList());

        return scheduleLists;
    }

    //Metodo para listar los horarios por medico y fecha
    /*@Transactional
    @Override
    public List<ScheduleList> getScheduleByDoctorAndDate(Long doctorId, LocalDate date) {

        List<DoctorSchedule> doctorSchedules = scheduleRepository.findByDoctors_Id(doctorId);

        //Mapear la lista de horarios
        List<ScheduleList> scheduleLists = doctorSchedules.stream().map(doctorSchedule -> {
            return new ScheduleList(
                    doctorSchedule.getId(),
                    doctorSchedule.getHourStart(),
                    doctorSchedule.getHourEnd(),
                    doctorSchedule.isAvialable()
            );
        }).collect(Collectors.toList());

        return scheduleLists;
    }*/

    //Metodo para registrar el horario de un medico
    @Transactional
    @Override
    public DoctorSchedule createSchedule(ScheduleRequest scheduleRequest) {

        //Validar si el medico existe
        DoctorEntity medico = doctorRepository.findById(scheduleRequest.doctorId())
                .orElseThrow(() -> new RuntimeException("El medico no existe"));

        //Validar si el horario es correcto
        validateSchedule(scheduleRequest);

        //crear un nuevo horario
        DoctorSchedule doctorSchedule = DoctorSchedule.builder()
                .hourStart(scheduleRequest.startHour())
                .hourEnd(scheduleRequest.endHour())
                .available(scheduleRequest.isAvailable())
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
    @Transactional
    @Override
    public void validateSchedule(ScheduleRequest scheduleRequest) {
        // Verificar si el horario ya existe para el doctor
        Optional<DoctorSchedule> doctorSchedule = scheduleRepository
                .findByDoctors_IdAndHourStartAndHourEnd(
                        scheduleRequest.doctorId(),
                        scheduleRequest.startHour(),
                        scheduleRequest.endHour());

        if (doctorSchedule.isPresent()) {
            throw new RuntimeException("El horario ya existe");
        }
        // Verificar que la hora de inicio no sea mayor que la hora de fin
        if (scheduleRequest.startHour().isAfter(scheduleRequest.endHour())) {
            throw new RuntimeException("La hora de inicio no puede ser mayor a la hora de fin");
        }

        // Consultar los horarios del doctor en una sola consulta
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctors_Id(scheduleRequest.doctorId());

        // Validar si el horario nuevo se cruza con los horarios existentes
        for (DoctorSchedule schedule : schedules) {
            // Comprobar que el nuevo horario no se cruza con ninguno existente
            if (schedule.getHourStart().isBefore(scheduleRequest.endHour()) &&
                    schedule.getHourEnd().isAfter(scheduleRequest.startHour())) {
                throw new RuntimeException("El horario se cruza con otro horario");
            }
        }
    }

    //Metodo para actualizar un horario
    @Transactional
    @Override
    public DoctorSchedule updateSchedule(Long id, ScheduleRequest scheduleRequest) {
        //Validar si el horario existe
        DoctorSchedule doctorSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El horario no existe"));

        //Validar si el horario es correcto
        validateSchedule(scheduleRequest);

        //Actualizar el horario
        doctorSchedule.setHourStart(scheduleRequest.startHour());
        doctorSchedule.setHourEnd(scheduleRequest.endHour());
        doctorSchedule.setAvailable(scheduleRequest.isAvailable());

        //Guardar el horario
        return scheduleRepository.save(doctorSchedule);
    }

    //Metodo para eliminar un horario
    @Transactional
    @Override
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
