package org.cours.web;

import org.cours.service.AiChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiChatController {

    private final AiChatService aiChatService;

    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    /**
     * POST /api/ai/chat  — Send a chat message to the AI assistant.
     * Request body: { "prompt": "Quelle voiture familiale recommandez-vous ?" }
     * Response:     { "response": "..." }
     */
    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String prompt = request.getOrDefault("prompt", "");
        String response = aiChatService.chat(prompt);
        return Map.of("response", response);
    }

    /**
     * GET /api/ai/chat?prompt=...  — Simple query interface.
     */
    @GetMapping("/chat")
    public Map<String, String> chatGet(@RequestParam String prompt) {
        String response = aiChatService.chat(prompt);
        return Map.of("response", response);
    }
}
