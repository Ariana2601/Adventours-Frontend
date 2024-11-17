package com.upc.tpadventours.controller;
import com.upc.tpadventours.DtoHUs.PreferenciaRequest;
import com.upc.tpadventours.entities.Preferencia;
import com.upc.tpadventours.entities.Usuario;
import com.upc.tpadventours.services.PreferenciaService;
import com.upc.tpadventours.services.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class PreferenciaController {
    @Autowired
    private PreferenciaService preferenciaService;
    @Autowired
    private UsuarioService usuarioService;
    //COMPLETO
    @PostMapping("/preferencias/insertarPreferencias")
    //@PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<Preferencia> insertarPreferencia(@RequestBody PreferenciaRequest request) {
        ModelMapper modelMapper = new ModelMapper();
        Preferencia preferencia = modelMapper.map(request.getPreferencias(), Preferencia.class);
        // Asociar el usuario a las preferencias
        Usuario usuario = usuarioService.obtenerUsuarioPorId(request.getUsuarioId());
        if (usuario == null) {
            return ResponseEntity.badRequest().body(null);
        }
        preferencia.setUsuario(usuario);
        Preferencia preferenciaGuardada = preferenciaService.insertarPreferencia(preferencia);
        return ResponseEntity.ok(preferenciaGuardada);
    }
    //COMPLETOS
    @GetMapping("/preferencias/buscarPreferencias/{usuarioId}")
    //@PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<Preferencia> buscarPreferencias(@PathVariable Long usuarioId) {
        return preferenciaService.buscarPreferenciasPorUsuario(usuarioId);
    }
    //COMPLETOS
    @DeleteMapping("/preferencias/eliminarPreferenciasPorUsuarioId/{usuarioId}")
    //@PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<Void> eliminarPreferenciasPorUsuarioId(@PathVariable Long usuarioId) {
        preferenciaService.eliminarPreferenciasPorUsuario(usuarioId);
        return ResponseEntity.noContent().build();
    }
}
//completo
