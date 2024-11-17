package com.upc.tpadventours.services;
import com.upc.tpadventours.DtoHUs.HUContactoDTO;
import com.upc.tpadventours.entities.Contacto;
import java.util.List;
public interface ContactoService {
    public Contacto insertarContacto(Contacto contacto);
    public List<Contacto> listarContactos();
    Contacto enviarMensaje(Contacto contacto, Long idUsuario);
}
