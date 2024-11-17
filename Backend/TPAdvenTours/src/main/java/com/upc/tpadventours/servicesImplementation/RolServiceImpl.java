package com.upc.tpadventours.servicesImplementation;
import com.upc.tpadventours.Repository.RolRepository;
import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.entities.Rol;
import com.upc.tpadventours.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class RolServiceImpl implements RolService {
    @Autowired
    private RolRepository rolRepository;
    @Override
    public Rol insertarRol(Rol rol){
        return rolRepository.save(rol);
    }
    @Override
    public void eliminarRol(Long id){
        if(rolRepository.existsById(id)) {
            rolRepository.deleteById(id);
        }
    }
    @Override
    public List<Rol> listarRol(){
        return rolRepository.findAll();
    }
    @Override
    public Rol obtenerRolPorNombre(String nombreRol) {
        // Busca si el rol existe
        Optional<Rol> rolOptional = rolRepository.findByNombreRol(nombreRol);
        // Si el rol no existe, lo crea
        if (!rolOptional.isPresent()) {
            Rol nuevoRol = new Rol();
            nuevoRol.setNombreRol(nombreRol);
            return rolRepository.save(nuevoRol);
        }
        // Si ya existe, lo retorna
        return rolOptional.get();
    }
//completado
}
