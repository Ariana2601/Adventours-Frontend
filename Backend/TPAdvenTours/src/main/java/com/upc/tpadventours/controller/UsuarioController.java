package com.upc.tpadventours.controller;
import com.upc.tpadventours.DtoHUs.HUIngresoSistema;
import com.upc.tpadventours.DtoHUs.HURegistroDatos;
import com.upc.tpadventours.dtos.UsuarioDTO;
import com.upc.tpadventours.entities.Rol;
import com.upc.tpadventours.entities.Usuario;
import com.upc.tpadventours.services.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@CrossOrigin(origins = {"*", "http://localhost:4200","http://3.131.140.104/"}, allowedHeaders = "*")
@RequestMapping("/api")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private RolService rolService;
    //COMPLETO
    @PostMapping("/usuarios/registrarUsuario")
    public ResponseEntity<?> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Optional<HURegistroDatos> usuarioExistente = usuarioService.findByNombreUsuarioOrCorreo(usuarioDTO.getNombreUsuario(), usuarioDTO.getCorreoElectronico());
        if (usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body("El nombre de usuario o el correo electrónico ya están registrados.");
        }
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreCompleto(usuarioDTO.getNombreCompleto());
        nuevoUsuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
        nuevoUsuario.setCorreoElectronico(usuarioDTO.getCorreoElectronico());
        nuevoUsuario.setContrasena(usuarioDTO.getContrasena());
        Rol rolUsuario = rolService.obtenerRolPorNombre("ROLE_USER");
        nuevoUsuario.setRol(rolUsuario);
        Usuario usuarioGuardado = usuarioService.insertarUsuario(nuevoUsuario);
        ModelMapper modelMapper = new ModelMapper();
        UsuarioDTO usuarioDTOResponse = modelMapper.map(usuarioGuardado, UsuarioDTO.class);
        return ResponseEntity.ok(usuarioDTOResponse);
    }
    @GetMapping("/usuario/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public UsuarioDTO listarUsuario(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Usuario usuario = usuarioService.obtenerUsuarioPorId(id);
        return modelMapper.map(usuario, UsuarioDTO.class);
    }
    //COMPLETO
    @PutMapping("/usuarios/modificarUsuario")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public UsuarioDTO modificarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);
        usuario = usuarioService.modificarUsuario(usuario);
        return modelMapper.map(usuario, UsuarioDTO.class);
    }
    //COMPLETO
    @GetMapping("/usuarios/listarUsuarios")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }
    //COMPLETO
    @DeleteMapping("/usuarios/eliminarUsuario/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
    }
    //COMPLETO
    @GetMapping("/usuarios/LogueoUsuario")
    //@PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<HUIngresoSistema> getBuscarPorNombreUsuarioYContraseña(@RequestParam String nombreUsuario, @RequestParam String contraseña) {
        return usuarioService.BuscarPorNombreUsuarioYContraseña(nombreUsuario,contraseña);
    }
}
//completo
