package com.upc.tpadventours.DtoHUs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HUContactoDTO {
    private Long idContacto;
    private String tipoMensaje;
    private String mensaje;
    private LocalDateTime fechaEnvio;
    private Long idUsuario;
}
