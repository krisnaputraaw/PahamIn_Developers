package com.intercorp.pahamin.user;

import com.intercorp.pahamin.chat.ChatMessageRepository;
import com.intercorp.pahamin.task.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminAnalyticsController {

    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final TaskRepository taskRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        long totalUsers = userRepository.count();
        long totalChats = chatMessageRepository.count();
        long totalTasks = taskRepository.count();

        List<Map<String, Object>> dailyStats = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);

            long userCount = userRepository.countByCreatedAtBetween(start, end);
            long chatCount = chatMessageRepository.countByCreatedAtBetween(start, end);
            long taskCount = taskRepository.countByCreatedAtBetween(start, end);

            Map<String, Object> stat = new HashMap<>();
            stat.put("date", date.toString());
            stat.put("users", userCount);
            stat.put("chats", chatCount);
            stat.put("tasks", taskCount);
            dailyStats.add(stat);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", totalUsers);
        response.put("totalChats", totalChats);
        response.put("totalTasks", totalTasks);
        response.put("dailyStats", dailyStats);

        return ResponseEntity.ok(response);
    }
}
