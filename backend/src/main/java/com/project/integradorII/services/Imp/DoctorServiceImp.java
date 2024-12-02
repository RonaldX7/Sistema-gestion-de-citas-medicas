package com.project.integradorII.services.Imp;

import com.project.integradorII.dto.authentication.UserRequest;
import com.project.integradorII.dto.doctor.DoctorList;
import com.project.integradorII.dto.doctor.DoctorRequest;
import com.project.integradorII.dto.doctor.DoctorUpdate;
import com.project.integradorII.entities.*;
import com.project.integradorII.repositories.DoctorRepository;
import com.project.integradorII.repositories.RoleRepository;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class DoctorServiceImp implements DoctorService {

    private final UserServiceImp userServiceImp;

    private final DoctorRepository doctorRepository;

    private final SpecialtyRepository specialtyRepository;

    private final RoleRepository rolRepository;

    private final PasswordEncoder passwordEncoder;

    //Metodo para listar todos los medicos
    @Transactional
    @Override
    public List<DoctorList> ListAllDoctors(){

        List<DoctorEntity> doctors = doctorRepository.findAll();

        //Mapear la lista de doctores
        List<DoctorList> doctorLists = doctors.stream()
                .map(doctorEntity -> {
            return new DoctorList(
                    doctorEntity.getId(),
                    doctorEntity.getName(),
                    doctorEntity.getLastName(),
                    doctorEntity.getPhone(),
                    doctorEntity.getCmp(),
                    doctorEntity.getEmail(),
                    doctorEntity.getSpecialties().getName()
            );
        }).collect(Collectors.toList());

        return doctorLists;
    }

    //Metodo para listar un medico por user_id
    @Transactional
    @Override
    public List<DoctorList> ListByUserId(Long userId){


        DoctorEntity doctors = doctorRepository.findDoctorEntitiesByUserId(userId);

        if (doctors == null) {
            throw new IllegalArgumentException("El medico no existe");
        }

        //Mapear la lista de doctores
        List<DoctorList> doctorLists = List.of(new DoctorList(
                doctors.getId(),
                doctors.getName(),
                doctors.getLastName(),
                doctors.getPhone(),
                doctors.getCmp(),
                doctors.getEmail(),
                doctors.getSpecialties().getName()
        ));

        return doctorLists;
    }

    //Metodo para listar los medicos por especialidad
    @Transactional
    @Override
    public List<DoctorList> ListAllDoctorsBySpecialty(Long specialty_id){

        List<DoctorEntity> doctors = doctorRepository.findDoctorEntitiesBySpecialties_Id(specialty_id);

        //Mapear la lista de doctores
        List<DoctorList> doctorLists = doctors.stream()
                .map(doctorEntity -> {
                    return new DoctorList(
                            doctorEntity.getId(),
                            doctorEntity.getName(),
                            doctorEntity.getLastName(),
                            doctorEntity.getPhone(),
                            doctorEntity.getCmp(),
                            doctorEntity.getEmail(),
                            doctorEntity.getSpecialties().getName()
                    );
                }).collect(Collectors.toList());

        return doctorLists;
    }


    //Metodo para crear un medico
    @Transactional
    @Override
    public DoctorEntity createDoctor(DoctorRequest doctorRequest) {

        //Asignar el rol al medico
        RoleEntity roleEntity = rolRepository.findById(doctorRequest.roleId())
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        if (roleEntity == null) {
            throw new IllegalArgumentException("Agrege un rol valido");
        }


        //Validar si la especialidad existe
        SpecialtyEntity specialtyEntity = specialtyRepository.findByName(doctorRequest.specialty());

        if (specialtyEntity.getId() == null) {
            throw new IllegalArgumentException("La especialidad no existe");
        }

        //Crear el usuario
        UserRequest userRequest = new UserRequest(
                doctorRequest.username(),
                doctorRequest.password(),
                roleEntity.getId()
        );

        UserEntity userEntity = userServiceImp.createUser(userRequest);

        //Crear y persistir el Doctor
        DoctorEntity doctorEntity = DoctorEntity.builder()
                .name(doctorRequest.name())
                .lastName(doctorRequest.lastName())
                .phone(doctorRequest.phone())
                .email(doctorRequest.email())
                .cmp(doctorRequest.cmp())
                .specialties(specialtyEntity)
                .user(userEntity)
                .build();

        //Guardar doctor
        return doctorRepository.save(doctorEntity);
    }

    //Metodo para actualizar los datos del medico
    @Transactional
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
        if (doctorUpdate.password() != null && !doctorUpdate.password().equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(doctorUpdate.password()));
        }

        return doctorRepository.save(doctorEntity);
    }

    //Metodo para borrar un medico
    @Transactional
    @Override
    public void deleteDoctor(Long id){
        doctorRepository.deleteById(id);
    }
}
