package com.upc.tpadventours.DtoHUs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HUPreferenciasPersonales {
    private String clima;
    private String presupuesto;
    private String actividades;
    private String ritmoViaje;
    private String tipoViaje;
}
