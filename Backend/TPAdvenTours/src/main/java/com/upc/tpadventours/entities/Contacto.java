package com.upc.tpadventours.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Contactos")
public class Contacto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContacto;

    @Column(name = "Tipo_mensaje", nullable = false, length = 100)
    private String tipoMensaje;

    @Column(name = "Mensaje", nullable = false, length = 500)
    private String mensaje;

    @Column(name = "Fecha_envio", nullable = false)
    private LocalDateTime fechaEnvio;
    //Prueba para github
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
}
