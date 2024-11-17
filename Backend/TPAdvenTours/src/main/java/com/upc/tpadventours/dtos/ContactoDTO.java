package com.upc.tpadventours.dtos;
import com.upc.tpadventours.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ContactoDTO {
    private long idContacto;
    private String tipoMensaje;
    private String mensaje;
    private LocalDateTime fechaEnvio;
    private Usuario usuario;
}
