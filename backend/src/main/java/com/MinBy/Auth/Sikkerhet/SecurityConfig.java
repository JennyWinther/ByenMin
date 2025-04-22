package com.MinBy.Auth.Sikkerhet;

import com.MinBy.Auth.UserDetails.CustomUserDetailsService;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.*;
import org.springframework.session.security.web.authentication.SpringSessionRememberMeServices;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.function.Consumer;

// Custom security filter laget for å handle oAuth login via Google, og standard form login med Spring.
// Tar også hånd om CORS fra Vite localhost server. Ved login via oAuth, redirecter
// filteret brukeren tilbake til forsiden til frontend.

@Configuration
public class SecurityConfig {
    @Value("${frontend.url}")
    private String frontendUrl;

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
                registry.requestMatchers("/", "/politiloggen/hentTilWidget/**", "/kommuner/alle", "/bruker/**", "/login", "/csrf").permitAll();
                registry.anyRequest().authenticated();
            })
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
            .csrf(Customizer.withDefaults())
            .formLogin(t -> t
                    .successHandler(successHandler)
                    .failureHandler(failureHandler)
            )
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .oauth2Login(oauth2 -> oauth2.defaultSuccessUrl(frontendUrl, true));
        return http.build();
    }

    // Legger til en CORS mapping fra Frontendurl, og gir standard HTML metoder lov til å brukes.
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(frontendUrl)
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("X-CSRF-TOKEN", "Content-Type", "Authorization")
                        .exposedHeaders("Authorization", "Location", "x-csrf-token");
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
