package com.upc.tpadventours.DtoHUs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HURegistroDatos {
    private String nombreCompleto;
    private String nombreUsuario;
    private String correoElectronico;
    private String contraseña;
}
