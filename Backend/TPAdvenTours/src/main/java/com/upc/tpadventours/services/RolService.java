package com.upc.tpadventours.services;

import com.upc.tpadventours.entities.Rol;

import java.util.List;

public interface RolService {
    public Rol insertarRol(Rol rol);
    public void eliminarRol(Long id);
    public List<Rol> listarRol();
    public Rol obtenerRolPorNombre(String nombreRol);

}
