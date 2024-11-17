package com.upc.tpadventours.dtos;

import com.upc.tpadventours.entities.Destino;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaDTO {
    private long idEmpresa;
    private String nombreEmpresa;
    private String contactoEmpresa;
}
