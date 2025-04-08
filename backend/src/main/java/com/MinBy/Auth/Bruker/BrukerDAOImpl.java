package com.MinBy.Auth.Bruker;

import com.MinBy.DTOs.BrukerDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

// Selve layeret som interagerer mot databasen for å legge til og finne brukere.
// Registrering encoder password med BCrypt.

@Transactional
@Repository
public class BrukerDAOImpl implements BrukerDAO {
    EntityManager entityManager;
    PasswordEncoder passwordEncoder;

    public BrukerDAOImpl(EntityManager entityManager, PasswordEncoder passwordEncoder) {
        this.entityManager = entityManager;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public BrukerDB finnBrukerMedEmail(String email) {
        try{
            BrukerDB bruker = entityManager.createQuery(
                            "SELECT b FROM BrukerDB b WHERE b.email = :email", BrukerDB.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return bruker;
        }
        catch (NoResultException e){
            System.out.println("Ingen bruker funnet med eposten");
            return null;
        }
        catch (Exception e){
            System.out.println("Uventet feil!");
            return null;
        }
    }

    @Override
    public BrukerDB registrerNyBruker(BrukerDTO brukerDTO, boolean isLocal) {
        BrukerDB eksisterendeBruker = finnBrukerMedEmail(brukerDTO.getEmail());
        if(eksisterendeBruker != null){
            throw new RuntimeException("Bruker eksisterer allerede!");
        }
        else{
            if(!isLocal){
                BrukerDB nyBruker = new BrukerDB(Type.OAUTH, brukerDTO.getBrukernavn(), passwordEncoder.encode(brukerDTO.getPassord()), brukerDTO.getEmail());
                try{
                    entityManager.persist(nyBruker);
                    return nyBruker;
                } catch (Exception e){
                    throw new RuntimeException("Kunne ikke legge til bruker!");
                }
            }
            else{
                BrukerDB nyBruker = new BrukerDB(Type.OAUTH, brukerDTO.getBrukernavn(), passwordEncoder.encode(brukerDTO.getPassord()), brukerDTO.getEmail());
                try{
                    entityManager.persist(nyBruker);
                    return nyBruker;
                } catch (Exception e){
                    throw new RuntimeException("Kunne ikke legge til bruker!");
                }
            }

        }
    }

    @Override
    public BrukerDB finnBrukerMedID(int id) {
        return entityManager.find(BrukerDB.class, id);
    }


    @Override
    public void slettBrukerViaId(int id) {
        BrukerDB bruker = finnBrukerMedID(id);
        entityManager.remove(bruker);
    }

    @Override
    public BrukerDB oppdaterBruker(BrukerDTO brukerDTO) {
        BrukerDB bruker = finnBrukerMedEmail(brukerDTO.getEmail());
        BrukerDB oppdatertBruker = new BrukerDB(bruker.getType(), bruker.getBrukernavn(), bruker.getPassord(), bruker.getEmail(), bruker.getRoller());

        return entityManager.merge(oppdatertBruker);
    }

    @Override
    public BrukerDB oppdaterHjemKommune(String epost, String hjemKommune) {
        BrukerDB bruker = finnBrukerMedEmail(epost);
        bruker.setHjemkommune(hjemKommune);
        return entityManager.merge(bruker);
    }

    @Override
    public String finnHjemKommune(String epost) {
        BrukerDB bruker = finnBrukerMedEmail(epost);
        return bruker.getHjemkommune();
    }
}
