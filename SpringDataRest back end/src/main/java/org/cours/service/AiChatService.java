package org.cours.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiChatService {

    private static final String SYSTEM_PROMPT = """
            Tu es un assistant expert automobile pour le Magasin des Voitures, une concession automobile.
            Tu aides les clients avec :
            - Des recommandations de voitures selon leurs besoins et budget
            - Des informations techniques sur les véhicules (marque, modèle, année, prix)
            - Des conseils d'entretien et de maintenance automobile
            - Des comparaisons entre différents modèles de voitures

            Réponds de manière professionnelle, amicale et concise.
            Si on te pose une question hors du domaine automobile, redirige poliment vers le sujet des voitures.
            Tu peux répondre en français ou en anglais selon la langue de la question.
            """;

    private final ChatClient chatClient;

    public AiChatService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder
                .defaultSystem(SYSTEM_PROMPT)
                .build();
    }

    /**
     * Send a user prompt to the AI and return the response.
     */
    public String chat(String userMessage) {
        return chatClient.prompt()
                .user(userMessage)
                .call()
                .content();
    }
}
