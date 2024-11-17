package com.upc.tpadventours.services;
import com.upc.tpadventours.DtoHUs.DestinoDetallesDTO;
import com.upc.tpadventours.DtoHUs.HURecomendacionesDeViajeDto;
import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Usuario;
import java.util.List;
public interface DestinoService {
    public Destino insertarDestino(Destino destino);
    public void eliminarDestino(Long id);
    public Destino modificarDestino(Destino destino);
    public List<Destino> listarDestino();
    public List<HURecomendacionesDeViajeDto> obtenerMejoresDestinos(Long usuarioId);
    List<Destino> obtenerDestinosMasPopulares();
    //asignar empresa a destino
    public Destino buscarPorId(Long idDestino);
    public Destino actualizarDestino(Destino destino);
    public DestinoDetallesDTO obtenerDetallesDestino(Long destinoId);
    public Destino obtenerDestinoPorId(Long id);
    public Destino obtenerDestinoPorNombre(String nombre);
}
