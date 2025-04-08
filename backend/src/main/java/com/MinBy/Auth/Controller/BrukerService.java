package com.MinBy.Auth.Controller;

import com.MinBy.Auth.Bruker.BrukerDAOImpl;
import com.MinBy.Auth.Bruker.BrukerDB;
import com.MinBy.DTOs.BrukerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Egen custom service for bruker for å hente fra MySQL database.
@Service
public class BrukerService {
    BrukerDAOImpl brukerDAO;
    @Autowired
    public BrukerService(BrukerDAOImpl brukerDAO) {
        this.brukerDAO = brukerDAO;
    }

    public BrukerDB registrerNyBruker(BrukerDTO brukerDTO, boolean isLocal) {
        BrukerDB nyBrukerDB = brukerDAO.registrerNyBruker(brukerDTO, isLocal);
        return nyBrukerDB;
    }
    public BrukerDB finnBrukerMedID(int id){
        BrukerDB bruker = brukerDAO.finnBrukerMedID(id);
        return bruker;
    }
    public BrukerDB finnBrukerMedEmail(String email){
        return brukerDAO.finnBrukerMedEmail(email);
    }
    public void slettBrukerViaId(int id){
        brukerDAO.slettBrukerViaId(id);
    }
    public BrukerDB oppdaterBruker(BrukerDTO brukerDTO){
        return brukerDAO.oppdaterBruker(brukerDTO);
    }

    public BrukerDB oppdaterHjemKommune(String brukerEpost, String hjemKommune){
        return brukerDAO.oppdaterHjemKommune(brukerEpost, hjemKommune);
    }
    public String hentHjemKommune(String brukerEpost){
        return brukerDAO.finnHjemKommune(brukerEpost);
    }
}
