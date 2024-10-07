package com.project.integradorII.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "doctor_schedules")
public class DoctorSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DayOfWeek day;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime hour_start;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime hour_end;

    @Column(name = "is_available")
    private boolean isAvailable;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "doctor_schedule_doctor",
            joinColumns = @JoinColumn(name = "doctor_schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "doctor_id")
    )
    private Set<DoctorEntity> doctors = new HashSet<>();
}