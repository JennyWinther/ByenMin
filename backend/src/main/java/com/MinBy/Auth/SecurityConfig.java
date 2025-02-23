package com.MinBy.Auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    // Custom security filter laget for å handle oAuth login via Google. Tar også hånd om CORS fra Vite localhost server,
    // og server en default Spring Boot login form (for nå) i tilfelle man ikke er logget inn. Ved login via oAuth, redirecter
    // filteret brukeren tilbake til forsiden til frontend.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(registry -> {
                registry.requestMatchers("/", "/politiloggen/hentTilWidget/**").permitAll();
                registry.requestMatchers("/api/me").permitAll();
                registry.anyRequest().authenticated();
                })
            .exceptionHandling(e -> e
                    .authenticationEntryPoint(
                            new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                    )
            )
            .oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("http://localhost:5173/", true))
            .formLogin(Customizer.withDefaults());

        return http.build();
    }

    // Legger til en CORS mapping fra localhost:5173.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowCredentials(true)
                        .allowedMethods("*");
            }
        };
    }
}
