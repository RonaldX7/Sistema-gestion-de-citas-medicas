package com.project.integradorII.services.Imp;

import com.project.integradorII.entities.SpecialtyEntity;
import com.project.integradorII.repositories.SpecialtyRepository;
import com.project.integradorII.services.SpecialtyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SpecialtyServiceImp implements SpecialtyService {

    private final SpecialtyRepository specialtyRepository;

    @Transactional
    @Override
    public List<SpecialtyEntity> listAllSpecialties() {
        return specialtyRepository.findAll();
    }
}
