package com.upc.tpadventours.dtos;

import com.upc.tpadventours.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class PreferenciaDTO {
    private long idPreferencia;
    private String clima;
    private String presupuesto;
    private String actividades;
    private String ritmoViaje;
    private String tipoViaje;
    private Usuario usuario;
}
