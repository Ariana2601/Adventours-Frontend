package com.upc.tpadventours.dtoSecurity;

import lombok.Data;

import java.util.Set;

@Data
public class AuthResponseDTO {
    private String jwt;
    private Set<String> roles;
}
