package com.upc.tpadventours.servicesImplementation;

import com.upc.tpadventours.Repository.PreferenciasRepository;
import com.upc.tpadventours.entities.Preferencia;
import com.upc.tpadventours.services.PreferenciaService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreferenciaServiceImpl implements PreferenciaService {
    @Autowired
    private PreferenciasRepository preferenciasRepository;

    @Override
    public Preferencia insertarPreferencia(Preferencia preferencia) {
        return preferenciasRepository.save(preferencia);
    }


    @Override
    public List<Preferencia> listarPreferencias() {
        return preferenciasRepository.findAll();
    }

    @Override
    public List<Preferencia> buscarPreferenciasPorUsuario(Long usuarioId) {
        return preferenciasRepository.findByUsuarioId(usuarioId);
    }

    @Override
    @Transactional
    public void eliminarPreferenciasPorUsuario(Long usuarioId) {
        preferenciasRepository.deleteByUsuarioId(usuarioId);
    }


}
