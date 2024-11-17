package com.upc.tpadventours.services;
import com.upc.tpadventours.entities.Destino;
import com.upc.tpadventours.entities.Empresa;
import java.util.List;
public interface EmpresaService {
    public Empresa insertarEmpresa(Empresa empresa);
    public void eliminarEmpresa(Long id);
    public Empresa modificarEmpresa(Empresa empresa);
    public List<Empresa> listarEmpresas();
    public Empresa obtenerEmpresaPorId(Long id);
    public Empresa buscarPorId(Long idEmpresa);
}
