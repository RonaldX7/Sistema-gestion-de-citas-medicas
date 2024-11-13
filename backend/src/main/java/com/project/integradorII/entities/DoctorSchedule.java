package com.project.integradorII.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "tb_schedules")
public class DoctorSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "hour_start")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime hourStart;

    @Column(name = "hour_end")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime hourEnd;

    @Column(name = "is_avaible")
    private boolean avialable;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnore
    @JoinTable(
            name="tb_doctor_schedule",
            joinColumns = @JoinColumn(name="schedule_id"),
            inverseJoinColumns = @JoinColumn(name="doctor_id")
    )
    private Set<DoctorEntity> doctors = new HashSet<>();
}
