package com.intercorp.pahamin.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class EisenhowerTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private boolean urgent;

    @Column(nullable = false)
    private boolean important;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EisenhowerQuadrant quadrant;

    private LocalDate deadline;

    private boolean done;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private com.intercorp.pahamin.user.User user;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.quadrant = determineQuadrant();
    }

    public EisenhowerQuadrant determineQuadrant() {
        if (urgent && important) return EisenhowerQuadrant.DO;
        if (!urgent && important) return EisenhowerQuadrant.DECIDE;
        if (urgent && !important) return EisenhowerQuadrant.DELEGATE;
        return EisenhowerQuadrant.DELETE;
    }
}