package com.upc.tpadventours.servicesImplementation;

import com.upc.tpadventours.DtoHUs.DestinoDetallesDTO;
import com.upc.tpadventours.DtoHUs.HURecomendacionesDeViajeDto;
import com.upc.tpadventours.Repository.DestinoRepository;
import com.upc.tpadventours.Repository.PreferenciasRepository;
import com.upc.tpadventours.dtos.EmpresaDTO;
import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.entities.Preferencia;
import com.upc.tpadventours.entities.Usuario;
import com.upc.tpadventours.services.DestinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DestinoServiceImpl implements DestinoService {
    @Autowired
    private DestinoRepository destinoRepository;

    @Autowired
    private PreferenciasRepository preferenciasRepository;

    @Override
    public Destino insertarDestino(Destino destino) {
        return destinoRepository.save(destino);
    }

    @Override
    public void eliminarDestino(Long id) {
        if(destinoRepository.existsById(id)) {
            destinoRepository.deleteById(id);
        }
    }

    @Override
    public Destino modificarDestino(Destino destino) {
        if(destinoRepository.existsById(destino.getIdDestino())){
            return destinoRepository.save(destino);
        }
        return null;
    }

    @Override
    public List<Destino> listarDestino() {
        return destinoRepository.findAll();
    }

    @Override
    public List<HURecomendacionesDeViajeDto> obtenerMejoresDestinos(Long usuarioId) {
        List<Preferencia> preferenciasList = preferenciasRepository.findByUsuarioId(usuarioId);
        if (preferenciasList.isEmpty()) {
            return Collections.emptyList();
        }
        Preferencia preferencias = preferenciasList.get(0);

        // Usar valores predeterminados si alguna preferencia es nula
        String clima = preferencias.getClima() != null ? preferencias.getClima() : " ";
        String presupuesto = preferencias.getPresupuesto() != null ? preferencias.getPresupuesto() : " ";
        String actividades = preferencias.getActividades() != null ? preferencias.getActividades() : " ";
        String ritmoViaje = preferencias.getRitmoViaje() != null ? preferencias.getRitmoViaje() : " ";
        String tipoViaje = preferencias.getTipoViaje() != null ? preferencias.getTipoViaje() : " ";

        //ACA
        //List<Destino> destinosParciales = destinoRepository.findPartialMatches();
        List<Destino> destinosExactos = destinoRepository.findExactMatches(clima, presupuesto, actividades, ritmoViaje, tipoViaje);
        if (destinosExactos.size() < 3) {
            List<Destino> destinosParciales = destinoRepository.findPartialMatches();
            for (Destino destino : destinosParciales) {
                int coincidencias = 0;
                if (destino.getClima().equals(clima)) coincidencias++;
                if (destino.getPresupuesto().equals(presupuesto)) coincidencias++;
                if (destino.getActividades().equals(actividades)) coincidencias++;
                if (destino.getRitmoViaje().equals(ritmoViaje)) coincidencias++;
                if (destino.getTipoViaje().equals(tipoViaje)) coincidencias++;

                if (coincidencias >= 2 && coincidencias <= 4) {
                    destinosExactos.add(destino);
                    if (destinosExactos.size() == 3) break;
                }
            }
            if (destinosExactos.size() == 2) {
                List<Destino> destinosParciales2 = destinoRepository.findPartialMatches();
                Destino destinoConMayorPopularidad = null;

                for (Destino destino2 : destinosParciales2) {
                    int coincidencias2 = 0;
                    if (destino2.getClima().equals(clima)) coincidencias2++;
                    if (destino2.getPresupuesto().equals(presupuesto)) coincidencias2++;
                    if (destino2.getActividades().equals(actividades)) coincidencias2++;
                    if (destino2.getRitmoViaje().equals(ritmoViaje)) coincidencias2++;
                    if (destino2.getTipoViaje().equals(tipoViaje)) coincidencias2++;

                    // Si no hay coincidencias
                    if (coincidencias2 == 0) {
                        // Busca el destino con mayor popularidad
                        if (destinoConMayorPopularidad == null || destino2.getPopularidad() > destinoConMayorPopularidad.getPopularidad()) {
                            destinoConMayorPopularidad = destino2;
                        }
                    }
                    if (coincidencias2 == 1){
                        destinosExactos.add(destino2);
                        if (destinosExactos.size() == 3) break;
                    }
                }

                // Si se encontró un destino con 0 coincidencias, lo agrega a la lista destinosExactos
                if (destinoConMayorPopularidad != null && destinosExactos.size() != 3) {
                    destinosExactos.add(destinoConMayorPopularidad);
                }
            }
        }
        // Transformar destinosExactos en HURecomendacionesDeViajeDto
        List<HURecomendacionesDeViajeDto> recomendaciones = new ArrayList<>();
        for (Destino destino : destinosExactos) {
            HURecomendacionesDeViajeDto dto = new HURecomendacionesDeViajeDto();
            dto.setIdDestino(destino.getIdDestino());
            dto.setNombre(destino.getNombre());
            dto.setDescripcion(destino.getDescripcion());
            dto.setPopularidad(destino.getPopularidad());
            dto.setClima(destino.getClima());
            dto.setPresupuesto(destino.getPresupuesto());
            dto.setActividades(destino.getActividades());
            dto.setRitmoViaje(destino.getRitmoViaje());
            dto.setTipoViaje(destino.getTipoViaje());
            recomendaciones.add(dto);
        }
        List<HURecomendacionesDeViajeDto> prueba= new ArrayList<>();
        HURecomendacionesDeViajeDto aaaa =new HURecomendacionesDeViajeDto();
        aaaa.setIdDestino(1L);
        aaaa.setNombre(" ");
        aaaa.setDescripcion(" ");
        aaaa.setPopularidad(10.0);
        aaaa.setClima(preferencias.getClima());
        aaaa.setPresupuesto(String.valueOf(destinosExactos.size()));
        aaaa.setActividades(destinosExactos.get(0).getNombre());
        aaaa.setRitmoViaje(destinosExactos.get(1).getNombre());
        aaaa.setTipoViaje(destinosExactos.get(2).getNombre());
        prueba.add(aaaa);
        return recomendaciones;

    }

    @Override
    public List<Destino> obtenerDestinosMasPopulares() {
        return destinoRepository.findDestinosMasPopulares();
    }

    @Override
    public Destino buscarPorId(Long idDestino) {
        return destinoRepository.findById(idDestino).orElse(null);
    }

    @Override
    public Destino actualizarDestino(Destino destino) {
        return destinoRepository.save(destino);
    }

    @Override
    public DestinoDetallesDTO obtenerDetallesDestino(Long destinoId) {
        Destino destino = destinoRepository.findById(destinoId)
                .orElseThrow(() -> new RuntimeException("Destino no encontrado"));

        // Mapear a DTO
        DestinoDetallesDTO destinoDetallesDTO = new DestinoDetallesDTO();
        destinoDetallesDTO.setIdDestino(destino.getIdDestino());
        destinoDetallesDTO.setNombre(destino.getNombre());
        destinoDetallesDTO.setDescripcion(destino.getDescripcion());
        destinoDetallesDTO.setClima(destino.getClima());
        destinoDetallesDTO.setPresupuesto(destino.getPresupuesto());
        destinoDetallesDTO.setActividades(destino.getActividades());
        destinoDetallesDTO.setRitmoViaje(destino.getRitmoViaje());
        destinoDetallesDTO.setTipoViaje(destino.getTipoViaje());
        destinoDetallesDTO.setPopularidad(destino.getPopularidad());

        // Mapear la empresa a su DTO correspondiente
        Empresa empresa = destino.getEmpresa();
        EmpresaDTO empresaDTO = new EmpresaDTO(empresa.getIdEmpresa(), empresa.getNombreEmpresa(), empresa.getContactoEmpresa()); // Asegúrate de que exista este constructor
        destinoDetallesDTO.setEmpresa(empresaDTO);

        return destinoDetallesDTO;
    }

    @Override
    public Destino obtenerDestinoPorId(Long id) {
        Optional<Destino> destino = destinoRepository.findById(id);
        return destino.orElse(null);
    }

    @Override
    public Destino obtenerDestinoPorNombre(String nombre) {
        return destinoRepository.findByNombre(nombre);
    }

}
