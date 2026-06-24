package com.intercorp.pahamin.notification;

import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public List<Notification> getNotifications() {
        User user = getCurrentUser();
        List<Notification> list = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        
        // Jika notifikasi kosong, buat notifikasi selamat datang default
        if (list.isEmpty()) {
            Notification welcome = Notification.builder()
                    .type("welcome")
                    .icon("👋")
                    .title("Selamat datang di PahamIn!")
                    .description("Mulai upload materi dan biarkan AI membantumu belajar")
                    .read(false)
                    .user(user)
                    .build();
            notificationRepository.save(welcome);
            list = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        }
        return list;
    }

    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notifikasi tidak ditemukan"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void markAllAsRead() {
        User user = getCurrentUser();
        List<Notification> list = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        for (Notification n : list) {
            if (!n.isRead()) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        }
    }

    public Notification createNotification(User user, String type, String icon, String title, String description) {
        Notification notification = Notification.builder()
                .type(type)
                .icon(icon)
                .title(title)
                .description(description)
                .read(false)
                .user(user)
                .build();
        return notificationRepository.save(notification);
    }
}
