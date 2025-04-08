package com.MinBy.Auth.Bruker;

import com.MinBy.DTOs.BrukerDTO;
import jakarta.persistence.EntityManager;

// Interface for DAO.

public interface BrukerDAO {
    public BrukerDB registrerNyBruker(BrukerDTO brukerDTO, boolean isLocal);
    public BrukerDB finnBrukerMedID(int id);
    public BrukerDB finnBrukerMedEmail(String email);
    public void slettBrukerViaId(int id);
    public BrukerDB oppdaterBruker(BrukerDTO brukerDTO);
    public BrukerDB oppdaterHjemKommune(String epost, String hjemKommune);
    public String finnHjemKommune(String epost);

}
