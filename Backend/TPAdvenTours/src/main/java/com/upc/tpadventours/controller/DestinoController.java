package com.upc.tpadventours.controller;
import com.upc.tpadventours.DtoHUs.AsignarDestinoDto;
import com.upc.tpadventours.DtoHUs.HURecomendacionesDeViajeDto;
import com.upc.tpadventours.dtos.DestinoDTO;
import com.upc.tpadventours.dtos.UsuarioDTO;
import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.entities.Usuario;
import com.upc.tpadventours.services.DestinoService;
import com.upc.tpadventours.services.EmpresaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@CrossOrigin(origins = {"*", "http://localhost:4200","http://3.131.140.104/"}, allowedHeaders = "*")
@RequestMapping("/api")
public class DestinoController {
    @Autowired
    private DestinoService destinoService;
    @Autowired
    private EmpresaService empresaService;
    //COMPLETO
    @PostMapping("/destinos/insertarDestino")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public DestinoDTO insertarDestino(@RequestBody DestinoDTO destinoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Destino destino = modelMapper.map(destinoDTO, Destino.class);
        destino = destinoService.insertarDestino(destino);
        return modelMapper.map(destino, DestinoDTO.class);
    }
    //COMPLETO
    @PostMapping("/destinos/asignarDestinoEmpresa")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public DestinoDTO asignarDestinoAEmpresa(@RequestBody AsignarDestinoDto asignarDestinoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Destino destino = destinoService.buscarPorId(asignarDestinoDTO.getIdDestino());
        Empresa empresa = empresaService.buscarPorId(asignarDestinoDTO.getIdEmpresa());
        destino.setEmpresa(empresa);
        destino = destinoService.actualizarDestino(destino);
        return modelMapper.map(destino, DestinoDTO.class);
    }
    //COMPLETO - REQUIERE EL ID EN EL POSTMAN
    @PutMapping("/destinos/modificarDestino")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public DestinoDTO modificarDestino(@RequestBody DestinoDTO destinoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Destino destino = modelMapper.map(destinoDTO, Destino.class);
        destino = destinoService.modificarDestino(destino);
        return modelMapper.map(destino, DestinoDTO.class);
    }
    //COMPLETO
    @GetMapping("/destinos/listarDestinos")
    //@PreAuthorize("hasAnyRole('ADMIN','USER')")
    public List<Destino> listarDestinos() {
        return destinoService.listarDestino();
    }
    //COMPLETO
    @DeleteMapping("/destinos/eliminarDestino/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public void eliminarDestino(@PathVariable Long id) {
        destinoService.eliminarDestino(id);
    }
    //COMPLETO
    @GetMapping("/destinos/DestinosRecomendaciones/{usuarioId}")
    //@PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<HURecomendacionesDeViajeDto>> obtenerRecomendaciones(@PathVariable Long usuarioId) {
        List<HURecomendacionesDeViajeDto> recomendaciones = destinoService.obtenerMejoresDestinos(usuarioId);
        return ResponseEntity.ok(recomendaciones);
    }
    //COMPLETO
    @GetMapping("/destinos/DestinosPopulares")
    //@PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<List<HURecomendacionesDeViajeDto>> obtenerDestinosPopulares() {
        List<Destino> destinosPopulares = destinoService.obtenerDestinosMasPopulares();
        ModelMapper modelMapper = new ModelMapper();
        List<HURecomendacionesDeViajeDto> popularesDto = destinosPopulares.stream()
                .map(destino -> modelMapper.map(destino, HURecomendacionesDeViajeDto.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(popularesDto);
    }
    @GetMapping("/destinos/obtenerDestinoPorId/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public DestinoDTO listarDestinos(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Destino destino = destinoService.obtenerDestinoPorId(id);
        return modelMapper.map(destino, DestinoDTO.class);
    }
    @GetMapping("/destinos/obtenerDestinoporNombre/{nombre}")
    //@PreAutorize("hasAnyRole('ADMIN')")
    public DestinoDTO listarDestinoPorNombre(@PathVariable String nombre) {
        ModelMapper modelMapper = new ModelMapper();
        Destino destino = destinoService.obtenerDestinoPorNombre(nombre);
        return modelMapper.map(destino, DestinoDTO.class);
    }
    //completo
}
