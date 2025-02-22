package com.MinBy.Auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

// RestController for testing - så langt er det ikke behov for å ha noe controller for funksjonen i seg selv,
// men jeg kan ville display'e brukerinfo igjennom endpoints på et senere tidspunkt. For nå er det testing at oAuth m/ Google
// faktisk fungerer, igjennom /username.

@RestController
public class BrukerController {
    @GetMapping(value = "/info")
    public Map<String, Object> userInfo(OAuth2AuthenticationToken authentication) {
        return authentication.getPrincipal().getAttributes();
    }

    @GetMapping("/api/me")
    public ResponseEntity<?> me(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        return ResponseEntity.ok("You are logged in as: " + principal.getName());
    }
}
