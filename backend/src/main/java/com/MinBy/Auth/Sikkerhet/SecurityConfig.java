package com.MinBy.Auth.Sikkerhet;

import com.MinBy.Auth.UserDetails.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Custom security filter laget for å handle oAuth login via Google, og standard form login med Spring.
// Tar også hånd om CORS fra Vite localhost server. Ved login via oAuth, redirecter
// filteret brukeren tilbake til forsiden til frontend.
// CSRF er disabled pga. problemer med login.
@Configuration
public class SecurityConfig {

    @Autowired
    private CustomAuthEntryPoint unauthorizedHandler;

    @Autowired
    private SuccessHandler successHandler;

    @Autowired
    private FailureHandler failureHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(registry -> {
                registry.requestMatchers("/", "/politiloggen/hentTilWidget/**", "/kommuner/alle", "/bruker/**", "/login").permitAll();
                registry.anyRequest().authenticated();
            })
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
            .csrf(AbstractHttpConfigurer::disable)
            .formLogin(t -> t
                    .successHandler(successHandler)
                    .failureHandler(failureHandler)
            )
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .oauth2Login(oauth2 -> oauth2.defaultSuccessUrl("http://localhost:5173/", true));
        return http.build();
    }

    // Legger til en CORS mapping fra localhost:5173, og gir standard HTML metoder lov til å brukes.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .exposedHeaders("Authorization", "Location");
            }
        };
    }

    // Lager en AuthenticationManager.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // Lager en PasswordEncoder.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Lager (og bruker) min customUserDetailsService.
    @Bean
    CustomUserDetailsService customUserDetailsService() {
        return new CustomUserDetailsService();
    }

}
