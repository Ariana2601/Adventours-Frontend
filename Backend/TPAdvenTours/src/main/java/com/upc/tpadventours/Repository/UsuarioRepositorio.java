package com.upc.tpadventours.Repository;
import com.upc.tpadventours.DtoHUs.HUIngresoSistema;
import com.upc.tpadventours.DtoHUs.HURegistroDatos;
import com.upc.tpadventours.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    //HU Como usuario quiero poder registrarme en la pagina web
    @Query("SELECT new com.upc.tpadventours.DtoHUs.HURegistroDatos(u.nombreCompleto, u.nombreUsuario, u.correoElectronico, u.contrasena) " +
            "FROM Usuario u WHERE u.nombreUsuario = :nombreUsuario OR u.correoElectronico = :correoElectronico")
    Optional<HURegistroDatos> findByNombreUsuarioOrCorreo(@Param("nombreUsuario") String nombreUsuario, @Param("correoElectronico") String correoElectronico);
    //HU Como usuario quiero poder ingresar al sistema
    @Query("SELECT new com.upc.tpadventours.DtoHUs.HUIngresoSistema(u.nombreCompleto,u.nombreUsuario,u.correoElectronico,u.contrasena) "+
            "From Usuario u Where u.nombreUsuario = :nombreUsuario AND u.contrasena = :contraseña" )
    List<HUIngresoSistema> BuscarPorNombreUsuarioYContraseña(@Param("nombreUsuario") String nombreUsuario, @Param("contraseña") String contraseña);
}
//completo
