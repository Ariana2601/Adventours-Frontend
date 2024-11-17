package com.upc.tpadventours.Repository;
import com.upc.tpadventours.entities.Preferencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface PreferenciasRepository extends JpaRepository<Preferencia, Long> {
    //HU PARA PREFERENCIAS
    @Query("SELECT p FROM Preferencia p WHERE p.usuario.idUsuario = :usuarioId")
    List<Preferencia> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    @Modifying
    @Query("DELETE FROM Preferencia p WHERE p.usuario.idUsuario = :usuarioId")
    void deleteByUsuarioId(@Param("usuarioId") Long usuarioId);
}//completo
