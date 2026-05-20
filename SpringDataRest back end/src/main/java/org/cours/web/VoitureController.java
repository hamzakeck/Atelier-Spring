package org.cours.web;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @RequestMapping("/voitures")
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }
}

