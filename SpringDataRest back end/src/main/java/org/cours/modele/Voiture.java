package org.cours.modele;

import lombok.*;
import org.springframework.lang.NonNull;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class Voiture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NonNull private String marque;
    @NonNull private String modele;
    @NonNull private String couleur;
    @NonNull private String immatricule;
    @NonNull private Integer annee;
    @NonNull private Integer prix;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire")
    @JsonIgnore
    private Proprietaire proprietaire;
}
