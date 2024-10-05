package com.project.integradorII.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String lastName;

    private String phone;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(name = "is_enable")
    private boolean isEnabled;

    @Column(name = "account_No_Locked")
    private boolean accountNoLocked;

    @ManyToOne(fetch = FetchType.EAGER , cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role_id")
    private RoleEntity role;
}
