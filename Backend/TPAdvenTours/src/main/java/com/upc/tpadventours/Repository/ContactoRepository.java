package com.upc.tpadventours.Repository;
import com.upc.tpadventours.entities.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {
}

//completo
