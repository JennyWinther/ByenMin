package com.MinBy.Auth.Controller;

import com.MinBy.Auth.Bruker.BrukerDB;
import com.MinBy.Auth.UserDetails.CustomUserDetails;
import com.MinBy.DTOs.BrukerDTO;
import com.MinBy.DTOs.BrukerInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.web.csrf.CsrfToken;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

// RestController for brukerfunksjoner.

// Endpoint for registrering av ny bruker:      /registrer
// Endpoint for sjekk av innlogging:            /me
// Endpoint for henting av brukerinfo:          /info

// Endpoint for å finne brukerinformasjon:      /hentBrukerInfo
// Endpoint for å oppdatere hjemkommune:        /oppdaterHjemKommune/{kommune}

@RestController
@RequestMapping("/bruker")
@CrossOrigin(origins = "${frontend.url}", allowCredentials = "true")
public class BrukerController {
    BrukerService brukerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Generer tilfeldige passord for OAuth brukere som blir lagret i DB.
    private String generateRandomPassword() {
        return passwordEncoder.encode("oauth_user_" + UUID.randomUUID());
    }

    @Autowired
    public BrukerController(BrukerService brukerService) {
        this.brukerService = brukerService;
    }

    @PostMapping("/registrer")
    public ResponseEntity<?> registrer(@RequestBody BrukerDTO bruker) throws Exception {
        try{
            BrukerDB nyBruker = brukerService.registrerNyBruker(bruker, true);

            if(nyBruker.getBrukernavn().equals("")){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            else {
                return new ResponseEntity<>(HttpStatus.CREATED);
            }

        } catch (Exception e){
            System.out.println("Brukerregistrering feilet! " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/info")
    public Map<String, Object> userInfo(OAuth2AuthenticationToken authentication) {
        return authentication.getPrincipal().getAttributes();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Principal principal, CsrfToken token) {
        //System.out.println("PRINCIPAL: " + principal);
        //System.out.println("Token: " + token.getToken());
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        return ResponseEntity.ok("You are logged in as: " + principal.getName());
    }

    @GetMapping("/hentBrukerInfo")
    public BrukerInfoDTO hentBrukerInformasjon(Principal principal) {
        String brukernavn = "";
        String epost = "";
        String hjemkommune = "";

        try {
            if (principal instanceof UsernamePasswordAuthenticationToken) {     // LOKAL BRUKER
                CustomUserDetails userDetails = (CustomUserDetails) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
                epost = userDetails.getEmail();
                brukernavn = userDetails.getUsername();
                hjemkommune = brukerService.finnBrukerMedEmail(epost).getHjemkommune();

            } else if (principal instanceof OAuth2AuthenticationToken oauthToken) {     // OAUTH GOOGLE BRUKER
                // OAuth bruker
                Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();

                epost = (String) attributes.get("email");
                brukernavn = (String) attributes.get("name");

                BrukerDB bruker = brukerService.finnBrukerMedEmail(epost);      // FINNES: hent hjemkommune, IKKE FINNES: lag bruker inn i DB. Dette muliggjør lagring av hjemkommune.
                if (bruker != null) {
                    hjemkommune = bruker.getHjemkommune();
                } else {
                    brukerService.registrerNyBruker(new BrukerDTO(brukernavn, generateRandomPassword(), epost), false);
                }
            }

            return new BrukerInfoDTO(brukernavn, epost, hjemkommune);

        } catch (Exception e) {
            System.out.println("Kunne ikke finne bruker: " + e.getMessage());
            return new BrukerInfoDTO();
        }
    }

    @PutMapping("/oppdaterHjemKommune/{kommune}")
    public BrukerInfoDTO oppdaterHjemKommuneTilAutentisertBruker(Principal principal, @PathVariable String kommune) {
        String epost = null;

        try {
            // Sjekk om brukeren er en lokal bruker eller OAuth-bruker
            if (principal instanceof OAuth2AuthenticationToken) {
                OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) principal;
                Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
                epost = (String) attributes.get("email");
                System.out.println("Oppdaterer kommune for OAuth-bruker: " + epost);
            } else if (principal instanceof UsernamePasswordAuthenticationToken) {
                CustomUserDetails userDetails = (CustomUserDetails) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
                epost = userDetails.getEmail();
                System.out.println("Oppdaterer kommune for lokal bruker: " + epost);
            } else {
                throw new Exception("Ukjent brukertype");
            }

            BrukerDB oppdatertBruker = brukerService.oppdaterHjemKommune(epost, kommune);
            BrukerInfoDTO sendbarBruker = new BrukerInfoDTO(oppdatertBruker.getBrukernavn(), oppdatertBruker.getEmail(), oppdatertBruker.getHjemkommune());
            return sendbarBruker;
        } catch (Exception e) {
            System.out.println("Kunne ikke oppdatere hjemkommune! " + e.getMessage());
            return new BrukerInfoDTO();
        }
    }
}
