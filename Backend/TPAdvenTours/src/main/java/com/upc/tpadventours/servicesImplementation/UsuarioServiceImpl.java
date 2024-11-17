package com.upc.tpadventours.servicesImplementation;
import com.upc.tpadventours.DtoHUs.HUIngresoSistema;
import com.upc.tpadventours.DtoHUs.HURegistroDatos;
import com.upc.tpadventours.Repository.RolRepository;
import com.upc.tpadventours.Repository.UsuarioRepositorio;
import com.upc.tpadventours.entities.Rol;
import com.upc.tpadventours.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.upc.tpadventours.services.UsuarioService;
import java.util.List;
import java.util.Optional;
@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private RolRepository rolRepository;
    @Override
    public Usuario insertarUsuario(Usuario usuario) {
        // Busca el rol "Usuario" en la base de datos
        Rol rolUsuario = rolRepository.findByNombreRol("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));  // Lanza excepción si no encuentra el rol
        // Asigna el rol "Usuario" al nuevo usuario
        usuario.setRol(rolUsuario);
        // Encripta la contraseña antes de guardarla
        //String hashedPassword = passwordEncoder.encode(usuario.getContrasena());
        //usuario.setContrasena(hashedPassword);
        // Guarda el nuevo usuario con su rol
        return usuarioRepositorio.save(usuario);
    }
    @Override
    public void eliminarUsuario(Long id) {
        if(usuarioRepositorio.existsById(id)) {
            usuarioRepositorio.deleteById(id);
        }
    }
    @Override
    public Usuario modificarUsuario(Usuario usuario) {
        if(usuarioRepositorio.existsById(usuario.getIdUsuario())){
            return usuarioRepositorio.save(usuario);
        }
        return null;
    }
    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }
    @Override
    public Usuario obtenerUsuarioPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepositorio.findById(id);
        return usuario.orElse(null);
    }
    @Override
    public List<HUIngresoSistema> BuscarPorNombreUsuarioYContraseña(String nombreUsuario, String contraseña) {
        return usuarioRepositorio.BuscarPorNombreUsuarioYContraseña(nombreUsuario,contraseña);
    }
    @Override
    public Optional<HURegistroDatos> findByNombreUsuarioOrCorreo(String nombreUsuario, String correoElectronico) {
        return usuarioRepositorio.findByNombreUsuarioOrCorreo(nombreUsuario, correoElectronico);
    }
}
//completado
