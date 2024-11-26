package com.project.integradorII.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tb_history_recuperation")
public class HistoryRecuperation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private UserEntity user;

    private String code;
}
