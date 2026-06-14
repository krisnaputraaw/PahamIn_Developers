package com.intercorp.pahamin.chat;

import com.intercorp.pahamin.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    List<ChatSession> findByUserOrderByCreatedAtDesc(User user);
}