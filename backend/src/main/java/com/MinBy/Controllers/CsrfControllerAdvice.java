package com.MinBy.Controllers;


import org.springframework.web.bind.annotation.ControllerAdvice;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class CsrfControllerAdvice {
    @ModelAttribute
    public void getCsrfToken(HttpServletResponse response, CsrfToken csrfToken) {
        response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
    }
}
