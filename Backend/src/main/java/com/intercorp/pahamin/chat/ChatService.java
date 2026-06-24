package com.intercorp.pahamin.chat;

import com.intercorp.pahamin.bot.LearningChatbot;
import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserProfile;
import com.intercorp.pahamin.user.UserProfileRepository;
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
    private final UserProfileRepository userProfileRepository;
    private final com.intercorp.pahamin.notification.NotificationService notificationService;

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
        User user = getCurrentUser();
        ChatSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session tidak ditemukan"));

        // Simpan pesan user
        ChatMessage userMessage = ChatMessage.builder()
                .sender(SenderType.USER)
                .content(content)
                .session(session)
                .build();
        messageRepository.save(userMessage);

        // Update streak belajar di profil user
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseGet(() -> UserProfile.builder()
                        .user(user)
                        .streakCount(0)
                        .filesUploaded(0)
                        .quizCompleted(0)
                        .avgPerDay("0 J")
                        .build());

        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        boolean streakIncremented = false;
        if (profile.getStreakCount() == null) {
            profile.setStreakCount(0);
        }

        if (profile.getLastChatAt() == null) {
            profile.setStreakCount(1);
            streakIncremented = true;
        } else {
            java.time.LocalDate lastChatDate = profile.getLastChatAt().toLocalDate();
            java.time.LocalDate today = now.toLocalDate();

            if (lastChatDate.isBefore(today)) {
                if (lastChatDate.equals(today.minusDays(1))) {
                    profile.setStreakCount(profile.getStreakCount() + 1);
                    streakIncremented = true;
                } else {
                    profile.setStreakCount(1);
                    streakIncremented = true;
                }
            }
        }
        profile.setLastChatAt(now);
        profile = userProfileRepository.save(profile);

        // Kirim notifikasi jika streak naik / menyala kembali
        if (streakIncremented) {
            notificationService.createNotification(
                    user,
                    "streak",
                    "🔥",
                    "Streak " + profile.getStreakCount() + " hari!",
                    "Keren! Kamu sudah belajar " + profile.getStreakCount() + " hari berturut-turut"
            );
        }

        // Instantiate LearningChatbot dan panggil respond()
        LearningChatbot bot = new LearningChatbot(user.getUsername(), profile, "casual");
        String botResponse = bot.respond(content);

        // Simpan response bot
        ChatMessage botMessage = ChatMessage.builder()
                .sender(SenderType.BOT)
                .content(botResponse)
                .session(session)
                .build();
        return messageRepository.save(botMessage);
    }
}