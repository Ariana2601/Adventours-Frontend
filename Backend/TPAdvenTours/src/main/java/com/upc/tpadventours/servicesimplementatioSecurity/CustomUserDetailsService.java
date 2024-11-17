package com.upc.tpadventours.servicesimplementatioSecurity;

import com.upc.tpadventours.Repository.UsuarioRepositorio;
import com.upc.tpadventours.entities.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UsuarioRepositorio userRepository;

    public CustomUserDetailsService(UsuarioRepositorio userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario user = userRepository.findByNombreUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // En lugar de un set de roles, solo manejamos un rol.
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRol().getNombreRol());

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getNombreUsuario())
                .password(user.getContrasena())
                .authorities(Collections.singleton(authority)) // Usamos singleton para un solo rol.
                .build();

    }
}
