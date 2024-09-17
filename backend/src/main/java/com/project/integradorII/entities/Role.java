package com.project.integradorII.entities;

import jakarta.persistence.*;
import static jakarta.persistence.GenerationType.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    Long id;
}
