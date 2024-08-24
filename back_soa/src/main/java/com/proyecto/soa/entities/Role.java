package com.proyecto.soa.entities;

import jakarta.persistence.*;
import static jakarta.persistence.GenerationType.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Role {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    Long id;
    @Column(name = "nombre")
    String name;
}
