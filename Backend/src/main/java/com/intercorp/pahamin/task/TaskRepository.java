package com.intercorp.pahamin.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intercorp.pahamin.user.User;

import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface TaskRepository extends JpaRepository<EisenhowerTask, Long> {
    List<EisenhowerTask> findByUser(User user);
    List<EisenhowerTask> findByUserAndQuadrant(User user, EisenhowerQuadrant quadrant);
    List<EisenhowerTask> findByUserAndDone(User user, boolean done);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}