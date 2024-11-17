package com.upc.tpadventours.config;
import com.upc.tpadventours.filters.JwtRequestFilter;
import com.upc.tpadventours.servicesimplementatioSecurity.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final CustomUserDetailsService userDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    //Inyectando JWT Filter por constructor
    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtRequestFilter jwtRequestFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    //se define como un bean para que pueda ser utilizado en otros lugares, como en el controlador de autenticación
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    // Bean para codificar las contraseñas para ser usando en cualquier parte de la app
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Definir el SecurityFilterChain como un bean, ya no necesitamos heredar, configuramos toda la seg.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Permitir acceso público a los endpoints de autenticación y registro de usuario
                        .requestMatchers("/authenticate", "/api/usuarios/registrarUsuario"
                                ,"/api/usuarios/listarUsuarios","/api/preferencias/insertarPreferencias",
                                "/api/destinos/insertarDestino","/api/usuarios/eliminarUsuario/{id}",
                                "/api/usuarios/modificarUsuario","/api/contactos/insertarContactos",
                                "/api/contactos/listarContactos","/api/contactos/enviarMensaje",
                                "/api/destinos/asignarDestinoEmpresa","/api/destinos/modificarDestino",
                                "/api/destinos/listarDestinos","/api/destinos/eliminarDestino/{id}",
                                "/api/destinos/DestinosRecomendaciones/{usuarioId}","/api/destinos/DestinosPopulares",
                                "/api/empresas/insertarEmpresa","/api/empresas/modificarEmpresa",
                                "/api/empresas/listarEmpresas","/api/empresas/eliminarEmpresa/{id}",
                                "/api/empresas/obtenerEmpresaPorId/{id}","/api/destinos/{idDestino}/detalles",
                                "/api/preferencias/buscarPreferencias/{usuarioId}","/api/preferencias/eliminarPreferenciasPorUsuarioId/{usuarioId}",
                                "/api/rol","/api/listarrol","/api/eliminarrol","/api/usuario/{id}","/api/usuarios/LogueoUsuario",
                                "/api/destinos/obtenerDestinoPorId/{id}","/api/destinos/obtenerDestinoporNombre/{nombre}"


                        ).permitAll()
                        .anyRequest().authenticated()  // El resto de las rutas requieren autenticación
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );

        // Añadir el filtro JWT antes del filtro de autenticación
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



}
