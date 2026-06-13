package com.intercorp.pahamin.chat;

import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatSessionRepository sessionRepository;
    private final ChatMessageRepository messageRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public List<ChatSession> getAllSessions() {
        return sessionRepository.findByUserOrderByCreatedAtDesc(getCurrentUser());
    }

    public ChatSession createSession(String title) {
        ChatSession session = ChatSession.builder()
                .title(title)
                .user(getCurrentUser())
                .build();
        return sessionRepository.save(session);
    }

    public void deleteSession(Long sessionId) {
        sessionRepository.deleteById(sessionId);
    }

    public List<ChatMessage> getMessages(Long sessionId) {
        ChatSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session tidak ditemukan"));
        return messageRepository.findBySessionOrderByCreatedAtAsc(session);
    }

    public ChatMessage sendMessage(Long sessionId, String content) {
        ChatSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session tidak ditemukan"));

        // Simpan pesan user
        ChatMessage userMessage = ChatMessage.builder()
                .sender(SenderType.USER)
                .content(content)
                .session(session)
                .build();
        messageRepository.save(userMessage);

        // Placeholder response bot (nanti diganti AI)
        ChatMessage botMessage = ChatMessage.builder()
                .sender(SenderType.BOT)
                .content("Halo! Ini response placeholder. Integrasi AI menyusul.")
                .session(session)
                .build();
        return messageRepository.save(botMessage);
    }
}