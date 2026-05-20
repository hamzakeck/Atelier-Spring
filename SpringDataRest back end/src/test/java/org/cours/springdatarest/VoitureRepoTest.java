package org.cours.springdatarest;

import org.cours.modele.Voiture;
import org.cours.modele.Proprietaire;
import org.cours.modele.ProprietaireRepo;
import org.cours.modele.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class VoitureRepoTest {

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    @Autowired
    VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Proprietaire proprietaire = new Proprietaire("Ali", "Hassan");
        proprietaireRepo.save(proprietaire);
        Voiture v = new Voiture("MiolaCar","Uber","Blanche","M-2020",2021,180000);
        Voiture saved = voitureRepo.save(v);
        assertThat(saved.getId()).isGreaterThan(0);
    }

    @Test
    public void supprimerVoiture() {
        Proprietaire proprietaire = new Proprietaire("Ali", "Hassan");
        proprietaireRepo.save(proprietaire);
        voitureRepo.save(new Voiture("MiolaCar","Uber","Blanche","M-2020",2021,180000));
        voitureRepo.save(new Voiture("MiniCooper","Uber","Rouge","C-2020",2021,180000));
        voitureRepo.deleteAll();
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}
