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
@Table(name = "Empresas")
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpresa;

    @Column(name = "Nombre_empresa", length = 100)
    private String nombreEmpresa;

    @Column(name = "Contacto_empresa", length = 100)
    private String contactoEmpresa;

}
