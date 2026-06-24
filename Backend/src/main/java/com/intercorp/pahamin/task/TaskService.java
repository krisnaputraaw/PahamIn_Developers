package com.intercorp.pahamin.task;

import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.intercorp.pahamin.bot.SchedulerBot;
import com.intercorp.pahamin.user.UserProfile;
import com.intercorp.pahamin.user.UserProfileRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    // dependency injection untuk repository dan bot
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final com.intercorp.pahamin.notification.NotificationService notificationService;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public EisenhowerTask addTask(TaskRequest request) {
        User user = getCurrentUser();

        EisenhowerTask task = new EisenhowerTask();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUrgent(request.isUrgent());
        task.setImportant(request.isImportant());
        task.setDeadline(request.getDeadline());
        task.setDone(false);
        task.setUser(user);

        // Pakai SchedulerBot untuk suggest kuadran
        UserProfile profile = userProfileRepository.findByUser(user).orElse(null);
        SchedulerBot schedulerBot = new SchedulerBot(user.getUsername(), profile);
        task.setQuadrant(schedulerBot.suggestTaskQuadrant(task));

        EisenhowerTask savedTask = taskRepository.save(task);

        // Kirim Notifikasi tugas baru berhasil ditambahkan
        String quadrantLabel = savedTask.getQuadrant().name();
        String friendlyQuadrant = quadrantLabel.substring(0, 1).toUpperCase() + quadrantLabel.substring(1).toLowerCase();
        
        notificationService.createNotification(
                user,
                "task",
                "📋",
                "Tugas baru ditambahkan",
                "\"" + savedTask.getTitle() + "\" masuk ke kuadran " + friendlyQuadrant
        );

        return savedTask;
    }

    public Map<String, List<EisenhowerTask>> getAllTasksGrouped() {
        User user = getCurrentUser();
        List<EisenhowerTask> tasks = taskRepository.findByUser(user);
        return tasks.stream().collect(Collectors.groupingBy(
                t -> t.getQuadrant().name()));
    }

    public List<EisenhowerTask> getTasksByQuadrant(EisenhowerQuadrant quadrant) {
        User user = getCurrentUser();
        return taskRepository.findByUserAndQuadrant(user, quadrant);
    }

    public EisenhowerTask markAsDone(Long taskId) {
        EisenhowerTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task tidak ditemukan"));
        task.setDone(true);
        return taskRepository.save(task);
    }

    public EisenhowerTask updateTask(Long taskId, TaskRequest request) {
        EisenhowerTask task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task tidak ditemukan"));
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUrgent(request.isUrgent());
        task.setImportant(request.isImportant());
        task.setDeadline(request.getDeadline());
        task.setQuadrant(task.getQuadrantEnum());
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}