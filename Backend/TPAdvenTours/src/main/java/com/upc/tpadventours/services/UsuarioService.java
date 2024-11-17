package com.upc.tpadventours.services;
import com.upc.tpadventours.DtoHUs.HUIngresoSistema;
import com.upc.tpadventours.DtoHUs.HURegistroDatos;
import com.upc.tpadventours.entities.Usuario;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
public interface UsuarioService {
    public Usuario insertarUsuario(Usuario usuario);
    public void eliminarUsuario(Long id);
    public Usuario modificarUsuario(Usuario usuario);
    public List<Usuario> listarUsuarios();
    public Usuario obtenerUsuarioPorId(Long id);
    public List<HUIngresoSistema> BuscarPorNombreUsuarioYContraseña(@Param("nombreUsuario") String nombreUsuario, @Param("contraseña") String contraseña);
    public Optional<HURegistroDatos> findByNombreUsuarioOrCorreo(String nombreUsuario, String correoElectronico);
}
//completado
