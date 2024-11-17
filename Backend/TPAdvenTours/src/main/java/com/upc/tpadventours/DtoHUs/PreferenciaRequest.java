package com.upc.tpadventours.DtoHUs;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

//La razon de la creacion de este DTO es para que encapule el usuarioid y las preferencias (preferencia controller)
public class PreferenciaRequest {
    private Long usuarioId;
    private HUPreferenciasPersonales preferencias;
}