package com.upc.tpadventours.Repository;
import com.upc.tpadventours.entities.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}
//completo
