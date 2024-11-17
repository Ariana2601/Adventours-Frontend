package com.upc.tpadventours.servicesImplementation;

import com.upc.tpadventours.Repository.EmpresaRepository;
import com.upc.tpadventours.entities.Empresa;
import com.upc.tpadventours.services.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaServiceImpl implements EmpresaService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    public Empresa insertarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public void eliminarEmpresa(Long id) {
        if (empresaRepository.existsById(id)) {
            empresaRepository.deleteById(id);
        }
    }

    @Override
    public Empresa modificarEmpresa(Empresa empresa) {
        if(empresaRepository.existsById(empresa.getIdEmpresa())){
            return empresaRepository.save(empresa);
        }
        return null;
    }

    @Override
    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }

    @Override
    public Empresa obtenerEmpresaPorId(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    @Override
    public Empresa buscarPorId(Long idEmpresa) {
        return empresaRepository.findById(idEmpresa).orElse(null);
    }
}
