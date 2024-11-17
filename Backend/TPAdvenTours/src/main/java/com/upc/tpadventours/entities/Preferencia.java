package com.upc.tpadventours.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "Preferencias")
public class Preferencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPreferencia;

    @Column(name = "Clima", length = 50)
    private String clima;

    @Column(name = "Presupuesto")
    private String presupuesto;

    @Column(name = "Actividades", length = 500)
    private String actividades;

    @Column(name = "Ritmo_viaje", length = 50)
    private String ritmoViaje;

    @Column(name = "Tipo_viaje", length = 50)
    private String tipoViaje;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonBackReference
    private Usuario usuario;

//Entidad terminada
}
