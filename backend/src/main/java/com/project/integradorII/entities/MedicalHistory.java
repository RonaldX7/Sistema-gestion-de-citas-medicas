package com.project.integradorII.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tb_medical_history")
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Relacion con el paciente
    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "patient_id")
    private PatientEntity patient;

    //Relacion con la cita medica
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "medical_appointment_id")
    private MedicalAppointment medicalAppointment;

    @CreationTimestamp
    @Column(name = "creation_date")
    private LocalDate creation_date;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
