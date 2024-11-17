package com.upc.tpadventours.controller;
import com.upc.tpadventours.DtoHUs.CrearEmpresaDTO;
import com.upc.tpadventours.DtoHUs.DestinoDetallesDTO;
import com.upc.tpadventours.dtos.DestinoDTO;
import com.upc.tpadventours.dtos.EmpresaDTO;
import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.services.DestinoService;
import com.upc.tpadventours.services.EmpresaService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class EmpresaController {
    @Autowired
    private EmpresaService empresaService;
    @Autowired
    private DestinoService destinoService;
    //COMPLETO
    @PostMapping("/empresas/insertarEmpresa")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public EmpresaDTO insertarEmpresa(@RequestBody CrearEmpresaDTO crearEmpresaDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Empresa empresa = modelMapper.map(crearEmpresaDTO, Empresa.class);
        empresa = empresaService.insertarEmpresa(empresa);
        return modelMapper.map(empresa, EmpresaDTO.class);
    }
    //COMPLETO
    @PutMapping("/empresas/modificarEmpresa")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public EmpresaDTO modificarEmpresa(@RequestBody EmpresaDTO empresaDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Empresa empresa = modelMapper.map(empresaDTO, Empresa.class);
        empresa = empresaService.modificarEmpresa(empresa);
        return modelMapper.map(empresa,EmpresaDTO.class);
    }
    //COMPLETO
    @GetMapping("/empresas/listarEmpresas")
    //@PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<Empresa> listarEmpresas() {
        return empresaService.listarEmpresas();
    }
    //COMPLETO
    @DeleteMapping("/empresas/eliminarEmpresa/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public void eliminarEmpresa(@PathVariable Long id) {
        empresaService.eliminarEmpresa(id);
    }
    //COMPLETO
    @GetMapping("/empresas/obtenerEmpresaPorId/{id}")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public EmpresaDTO obtenerEmpresaPorId(@PathVariable Long id) {
        Empresa empresa = empresaService.obtenerEmpresaPorId(id);
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(empresa, EmpresaDTO.class);
    }
    @GetMapping("/destinos/{idDestino}/detalles")
    //@PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity<DestinoDetallesDTO> obtenerDetallesDestino(@PathVariable Long idDestino) {
        DestinoDetallesDTO destinoDetalles = destinoService.obtenerDetallesDestino(idDestino);
        return ResponseEntity.ok(destinoDetalles);
    }
}
//completo
