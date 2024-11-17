package com.upc.tpadventours.Repository;
import com.upc.tpadventours.entities.Destino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface DestinoRepository extends JpaRepository<Destino, Long> {
    Destino findByNombre(String nombre);
    @Query("SELECT d FROM Destino d WHERE d.clima = :clima AND d.presupuesto =:presupuesto AND d.actividades=:actividades AND d.ritmoViaje=:ritmoViaje AND d.tipoViaje=:tipoViaje ORDER BY d.popularidad DESC")
    List<Destino> findExactMatches(@Param("clima") String clima, @Param("presupuesto") String presupuesto,@Param("actividades") String actividades, @Param("ritmoViaje") String ritmoViaje, @Param("tipoViaje") String tipoViaje);
    // Buscar destinos que coincidan parcialmente con las preferencias del usuario
    @Query("SELECT d FROM Destino d  ORDER BY d.popularidad DESC")
    List<Destino> findPartialMatches();
    //HU para los detinos mas populares (HU POPULARIDAD)
    @Query("SELECT d FROM Destino d ORDER BY d.popularidad DESC")
    List<Destino> findDestinosMasPopulares();
}
//completo
