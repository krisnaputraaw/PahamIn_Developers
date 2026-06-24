package com.intercorp.pahamin.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final com.intercorp.pahamin.task.TaskRepository taskRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public UserProfile getProfile() {
        User user = getCurrentUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseGet(() -> userProfileRepository.save(UserProfile.builder()
                        .user(user)
                        .streakCount(0)
                        .filesUploaded(0)
                        .quizCompleted(0)
                        .avgPerDay("0 J")
                        .build()));

        // Hitung tasksCompleted secara dinamis
        int completedCount = taskRepository.findByUserAndDone(user, true).size();
        profile.setTasksCompleted(completedCount);

        return profile;
    }

    public UserProfile updateProfile(UserProfileRequest request) {
        User user = getCurrentUser();

        // Update user email if it changed
        if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(user.getEmail())) {
            user.setEmail(request.getEmail());
            userRepository.save(user);
        }

        UserProfile profile = userProfileRepository.findByUser(user)
                .orElseGet(() -> UserProfile.builder().user(user).build());

        profile.setFullName(request.getFullName());
        profile.setBio(request.getBio());
        profile.setInstitution(request.getInstitution());
        profile.setMajor(request.getMajor());
        profile.setSemester(request.getSemester());
        profile.setCity(request.getCity());
        
        // New fields
        profile.setNickname(request.getNickname());
        profile.setAvatarUrl(request.getAvatarUrl());
        if (request.getFilesUploaded() != null) {
            profile.setFilesUploaded(request.getFilesUploaded());
        }
        if (request.getQuizCompleted() != null) {
            profile.setQuizCompleted(request.getQuizCompleted());
        }
        if (request.getAvgPerDay() != null) {
            profile.setAvgPerDay(request.getAvgPerDay());
        }

        UserProfile saved = userProfileRepository.save(profile);

        // Hitung tasksCompleted secara dinamis
        int completedCount = taskRepository.findByUserAndDone(user, true).size();
        saved.setTasksCompleted(completedCount);

        return saved;
    }
}