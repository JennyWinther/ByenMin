package com.MinBy.Auth.Sikkerhet;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

// Redirecter bruker fra Spring sin loginside til min egen i frontend.

@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {

    @Value("${frontend.url}")
    private String frontendBaseUrl;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        System.out.println("Hei jeg er her for å si ifra at dette skjer i authentrypoint");

        String frontendLoginUrl = frontendBaseUrl + "/login";
        response.sendRedirect(frontendLoginUrl);
    }
}