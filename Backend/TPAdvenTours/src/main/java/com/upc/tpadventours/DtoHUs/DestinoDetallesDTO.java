package com.upc.tpadventours.DtoHUs;

import com.upc.tpadventours.dtos.EmpresaDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DestinoDetallesDTO {
    private Long idDestino;
    private String nombre;
    private String descripcion;
    private String clima;
    private String presupuesto;
    private String actividades;
    private String ritmoViaje;
    private String tipoViaje;
    private Double popularidad;

    private EmpresaDTO empresa;
}