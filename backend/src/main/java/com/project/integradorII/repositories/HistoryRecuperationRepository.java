package com.project.integradorII.repositories;

import com.project.integradorII.entities.HistoryRecuperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRecuperationRepository extends JpaRepository<HistoryRecuperation, Integer> {
    HistoryRecuperation findByCode(String code);
}
