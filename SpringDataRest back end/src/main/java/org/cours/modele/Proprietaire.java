package org.cours.modele;

import lombok.*;
import org.springframework.lang.NonNull;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class Proprietaire {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NonNull
    private String nom;

    @NonNull
    private String prenom;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "proprietaire")
    @JsonIgnore
    private java.util.List<Voiture> voitures;
}
