package com.project.integradorII.entities;

import jakarta.persistence.*;

@Entity
public class AppointmentCosts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double cost;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "specialty_id")
    private SpecialtyEntity specialty;
}
