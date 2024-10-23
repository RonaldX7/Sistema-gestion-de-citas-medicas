package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DoctorServiceImp implements DoctorService {

    private final DoctorRepository doctorRepository;

    private final SpecialtyRepository specialtyRepository;

    private final RoleRepository rolRepository;

    //Metodo para listar todos los medicos
    @Override
    public List<DoctorList> ListAllDoctors(){

        List<DoctorEntity> doctors = doctorRepository.findAll();

        //Mapear la lista de doctores
        List<DoctorList> doctorLists = doctors.stream().map(doctorEntity -> {
            return new DoctorList(
                    doctorEntity.getId(),
                    doctorEntity.getName(),
                    doctorEntity.getLastName(),
                    doctorEntity.getPhone(),
                    doctorEntity.getCmp(),
                    doctorEntity.getSpecialties().stream().map(SpecialtyEntity::getName)
                            .collect(Collectors.toList())
            );
        }).collect(Collectors.toList());

        return doctorLists;
    }

    //Metodo para crear un medico
    @Override
    public DoctorEntity createDoctor(DoctorRequest doctorRequest) {

        RoleEnum role = RoleEnum.valueOf(doctorRequest.roleName());

        //Asignar el rol al medico
        RoleEntity roleEntity = rolRepository.findRoleEntitiesByRoleEnum(role)
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }

        //Guardar la especialidad si no existe
        doctorRequest.specialty().specialtyListName().forEach(specialtyName -> {
            Optional<SpecialtyEntity> specialtyEntity = specialtyRepository.findByName(specialtyName);

            //Si no existe la especialidad se crea
            if (specialtyEntity.isEmpty()) {
                SpecialtyEntity specialty = SpecialtyEntity.builder().name(specialtyName).build();
                specialtyRepository.save(specialty);
            }
        });

        // Asignar especialidades al doctor
        Set<SpecialtyEntity> specialties = specialtyRepository.
                findSpecialtyEntitiesByNameIn(doctorRequest.specialty().specialtyListName())
                .stream().collect(Collectors.toSet());

        //Crear y persistir el Doctor
        DoctorEntity doctorEntity = DoctorEntity.builder()
                .name(doctorRequest.name())
                .lastName(doctorRequest.lastName())
                .phone(doctorRequest.phone())
                .email(doctorRequest.email())
                .cmp(doctorRequest.cmp())
                .specialties(specialties)
                .user(UserEntity.builder()
                        .username(doctorRequest.username())
                        .password(doctorRequest.password())
                        .isEnabled(true)
                        .accountNoLocked(true)
                        .role(roleEntity)
                        .build())
                .build();

        //Guardar doctor
        return doctorRepository.save(doctorEntity);
    }

    //Metodo para actualizar los datos del medico
    @Override
    public DoctorEntity updateDoctor(Long id, DoctorUpdate doctorUpdate){

        //Buscar medico por ID
        DoctorEntity doctorEntity = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado"));

        //Actualizar datos del medico
        doctorEntity.setCmp(doctorUpdate.cmp());
        doctorEntity.setName(doctorUpdate.name());
        doctorEntity.setLastName(doctorUpdate.lastName());
        doctorEntity.setPhone(doctorUpdate.phone());
        doctorEntity.setEmail(doctorUpdate.email());

        UserEntity user = doctorEntity.getUser();
        user.setPassword(doctorUpdate.password());

        return doctorRepository.save(doctorEntity);
    }

    //Metodo para borrar un medico
    @Override
    public void deleteDoctor(Long id){
        doctorRepository.deleteById(id);
    }
}
