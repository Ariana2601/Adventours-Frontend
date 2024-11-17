package com.upc.tpadventours.dtos;

import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Preferencia;
import com.upc.tpadventours.entities.Rol;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private long idUsuario;
    private String nombreCompleto;
    private String nombreUsuario;
    private String correoElectronico;
    private String contrasena;
    private Rol rol;
}

