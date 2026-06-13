package com.intercorp.pahamin.task;

import com.intercorp.pahamin.user.User;
import com.intercorp.pahamin.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public EisenhowerTask addTask(TaskRequest request) {
        User user = getCurrentUser();
        EisenhowerTask task = EisenhowerTask.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .urgent(request.isUrgent())
                .important(request.isImportant())
                .deadline(request.getDeadline())
                .done(false)
                .user(user)
                .build();
        return taskRepository.save(task);
    }

    public Map<String, List<EisenhowerTask>> getAllTasksGrouped() {
        User user = getCurrentUser();
        List<EisenhowerTask> tasks = taskRepository.findByUser(user);
        return tasks.stream().collect(Collectors.groupingBy(
                t -> t.getQuadrant().name()
        ));
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
        task.setQuadrant(task.determineQuadrant());
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}