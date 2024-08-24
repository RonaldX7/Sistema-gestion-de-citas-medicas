package com.proyecto.soa.entities;

import static jakarta.persistence.GenerationType.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.proyecto.soa.dtos.IUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class User implements IUser {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Size(max = 45)
    @Column(name = "nombre")
    @NotEmpty
    private String name;

    @Size(max = 45)
    @Column(name = "apellido")
    @NotEmpty
    private String lastname;

    @Size(max = 45)
    @Email
    @Column(name = "email")
    @NotEmpty
    private String email;

    @Size(max = 45)
    @Column(name = "password")
    @NotEmpty
    private String password;

    @Size(max = 8)
    @Column(name = "dni")
    @NotEmpty
    private String dni;

    //Relacion de muchos a muchos
    @JsonIgnoreProperties({"handler","hibernateLazyInitializer"})
    @ManyToMany(fetch=FetchType.LAZY)
    //Tabla intermedia
    @JoinTable(
            name="usuario_rol",
            joinColumns = {@JoinColumn(name="usuario_id")},
            inverseJoinColumns = {@JoinColumn(name="rol_id")},
            uniqueConstraints = {@UniqueConstraint(columnNames = {"usuario_id","rol_id"})}
    )
    private List<Role> roles;

    //Atributo que no se mapea a la base de datos
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean admin;

    //Atributo que no se mapea a la base de datos
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean doctor;
    //Atributo que no se mapea a la base de datos
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String username;
}
