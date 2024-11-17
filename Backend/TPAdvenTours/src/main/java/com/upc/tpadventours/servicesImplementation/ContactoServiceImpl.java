package com.upc.tpadventours.servicesImplementation;
import com.upc.tpadventours.DtoHUs.HUContactoDTO;
import com.upc.tpadventours.Repository.ContactoRepository;
import com.upc.tpadventours.Repository.UsuarioRepositorio;
import com.upc.tpadventours.dtos.ContactoDTO;
import com.upc.tpadventours.entities.Contacto;
import com.upc.tpadventours.entities.Usuario;
import com.upc.tpadventours.services.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class ContactoServiceImpl implements ContactoService {
    @Autowired
    private ContactoRepository contactoRepository;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Override
    public Contacto insertarContacto(Contacto contacto) {
        return contactoRepository.save(contacto); }
    @Override
    public List<Contacto> listarContactos() {
        return contactoRepository.findAll(); }
    @Override
    public Contacto enviarMensaje(Contacto contacto, Long idUsuario) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        contacto.setUsuario(usuario);
        contacto.setFechaEnvio(LocalDateTime.now());
        return contactoRepository.save(contacto);
    }
}
//completado
