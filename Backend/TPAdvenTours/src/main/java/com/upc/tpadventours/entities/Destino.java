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
@Table(name = "Destinos")
public class Destino {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDestino;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "Descripcion", length = 500)
    private String descripcion;

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

    @Column(name = "Popularidad")
    private Double popularidad;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonBackReference
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Empresa empresa;

    //entidad completada
}
