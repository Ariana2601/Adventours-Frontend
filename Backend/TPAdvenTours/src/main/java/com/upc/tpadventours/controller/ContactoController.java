package com.upc.tpadventours.controller;
import com.upc.tpadventours.DtoHUs.HUContactoDTO;
import com.upc.tpadventours.dtos.ContactoDTO;
import com.upc.tpadventours.entities.Contacto;
import com.upc.tpadventours.services.ContactoService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
//@CrossOrigin(origins = {"http://localhost:4200","http://3.131.140.104/"})
@RestController
@CrossOrigin(origins = {"*", "http://localhost:4200","http://3.131.140.104/"}, allowedHeaders = "*")
@RequestMapping("/api")
public class ContactoController {
    @Autowired
    private ContactoService contactoService;
    //COMPLETO - PRUEBA
    @PostMapping("/contactos/insertarContactos")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public ContactoDTO insertarContactos(@RequestBody ContactoDTO contactoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Contacto contacto = modelMapper.map(contactoDTO, Contacto.class);
        contacto = contactoService.insertarContacto(contacto);
        return modelMapper.map(contacto, ContactoDTO.class);
    }
    //COmPLETO
    @GetMapping("/contactos/listarContactos")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public List<Contacto> listarContactos() {
        return contactoService.listarContactos();
    }
    //COMPLETO
    @PostMapping("/contactos/enviarMensaje")
    //@PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<HUContactoDTO> enviarMensaje(@RequestBody HUContactoDTO huContactoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Contacto contacto = modelMapper.map(huContactoDTO, Contacto.class);
        contacto.setFechaEnvio(LocalDateTime.now());
        Contacto mensajeGuardado = contactoService.enviarMensaje(contacto, huContactoDTO.getIdUsuario());
        HUContactoDTO contactoDTO = modelMapper.map(mensajeGuardado, HUContactoDTO.class);
        return ResponseEntity.ok(contactoDTO);
    }
//completo
}
