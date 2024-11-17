package com.upc.tpadventours.dtos;

import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DestinoDTO {
    private long idDestino;
    private String nombre;
    private String descripcion;
    private String clima;
    private String presupuesto;
    private String actividades;
    private String ritmoViaje;
    private String tipoViaje;
    private Double popularidad;
    private Usuario usuario;
    private Empresa empresa;
}
