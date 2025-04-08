package com.MinBy.Auth.UserDetails;

import com.MinBy.Auth.Bruker.BrukerDB;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// Brukerservice, spesifikt for å loade brukere via UserDetailsService. Fungerer via Spring sin formLogin.

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public UserDetails loadUserByUsername(String brukernavn) throws UsernameNotFoundException {
        try{
            BrukerDB user = entityManager
                    .createQuery("SELECT u FROM BrukerDB u WHERE u.brukernavn = :brukernavn", BrukerDB.class)
                    .setParameter("brukernavn", brukernavn)
                    .getSingleResult();
            return new CustomUserDetails(user);
        } catch (NoResultException e){
            throw new UsernameNotFoundException("Fant ikke bruker");
        }
    }
}
