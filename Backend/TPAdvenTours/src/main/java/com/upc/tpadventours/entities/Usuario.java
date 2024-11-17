package com.upc.tpadventours.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    @Column(name = "Nombre_completo", nullable = false, length = 100)
    private String nombreCompleto;
    @Column(name = "Nombre_usuario", nullable = false, length = 50)
    private String nombreUsuario;
    @Column(name = "Correo_electronico", nullable = false, length = 100)
    private String correoElectronico;
    @Column(name = "contrasena", nullable = false, length = 200)
    private String contrasena;
    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;
}

//Entidad terminada
