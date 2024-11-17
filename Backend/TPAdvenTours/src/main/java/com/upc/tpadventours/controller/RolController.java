package com.upc.tpadventours.controller;

import com.upc.tpadventours.dtos.PreferenciaDTO;
import com.upc.tpadventours.dtos.RolDTO;
import com.upc.tpadventours.entities.Preferencia;
import com.upc.tpadventours.entities.Rol;
import com.upc.tpadventours.services.RolService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*", "http://localhost:4200","http://3.131.140.104/"}, allowedHeaders = "*")
@RequestMapping("/api")
public class RolController {
    @Autowired
    private RolService rolService;

    //Pruebas - no es necesario
    @PostMapping("/rol")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public RolDTO insertarRol(@RequestBody RolDTO rolDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Rol rol  = modelMapper.map(rolDTO, Rol.class);
        rol = rolService.insertarRol(rol);
        return modelMapper.map(rol, RolDTO.class);

    }
    //Pruebas - no es necesario
    @GetMapping("/listarrol")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public List<Rol> listarRoles() {return rolService.listarRol();}

    //Pruebas - no es necesario
    @DeleteMapping("/eliminarrol")
    //@PreAuthorize("hasAnyRole('ADMIN')")
    public void eliminarRol(@RequestBody RolDTO rolDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Rol rol  = modelMapper.map(rolDTO, Rol.class);
        rolService.eliminarRol(rol.getId());
    }


}
