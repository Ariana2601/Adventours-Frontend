package com.upc.tpadventours.services;
import com.upc.tpadventours.entities.Preferencia;
import java.util.List;
public interface PreferenciaService {
    public Preferencia insertarPreferencia(Preferencia preferencia);
    public List<Preferencia> listarPreferencias();
    List<Preferencia> buscarPreferenciasPorUsuario(Long usuarioId);
    void eliminarPreferenciasPorUsuario(Long usuarioId);
}
//completado
