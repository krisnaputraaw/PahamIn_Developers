package com.intercorp.pahamin.task;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<EisenhowerTask> addTask(@Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.addTask(request));
    }

    @GetMapping
    public ResponseEntity<Map<String, List<EisenhowerTask>>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasksGrouped());
    }

    @GetMapping("/quadrant/{quadrant}")
    public ResponseEntity<List<EisenhowerTask>> getByQuadrant(@PathVariable EisenhowerQuadrant quadrant) {
        return ResponseEntity.ok(taskService.getTasksByQuadrant(quadrant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EisenhowerTask> updateTask(@PathVariable Long id,
                                                      @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    @PatchMapping("/{id}/done")
    public ResponseEntity<EisenhowerTask> markAsDone(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.markAsDone(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}