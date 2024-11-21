package com.project.integradorII.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tb_medical_appoinments")
public class MedicalAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "doctor_id")
    private DoctorEntity doctor;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "patient_id")
    private PatientEntity patient;

    @Column(name = "appointment_date")
    private LocalDate date;

    @Column(name = "appointment_start_time")
    private LocalTime startTime;

    @Column(name = "appointment_end_time")
    private LocalTime endTime;

    @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "cost_id")
    private AppointmentCosts cost;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "status_id")
    private AppointmentStatus status;

}
