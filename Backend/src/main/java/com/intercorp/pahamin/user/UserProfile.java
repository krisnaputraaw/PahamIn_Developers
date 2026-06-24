package com.intercorp.pahamin.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String bio;
    private String institution;
    private String major;
    private Integer semester;
    private String city;

    private String nickname;

    @Column(columnDefinition = "TEXT")
    private String avatarUrl;

    @Builder.Default
    private Integer streakCount = 0;

    private java.time.LocalDateTime lastChatAt;

    @Builder.Default
    private Integer filesUploaded = 0;

    @Builder.Default
    private Integer quizCompleted = 0;

    @Builder.Default
    private String avgPerDay = "0 J";

    @Transient
    private Integer tasksCompleted;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}