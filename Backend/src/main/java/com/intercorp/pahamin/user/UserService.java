package com.intercorp.pahamin.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }

    public UserProfile getProfile() {
        User user = getCurrentUser();
        return userProfileRepository.findByUser(user)
                .orElse(UserProfile.builder().user(user).build());
    }

    public UserProfile updateProfile(UserProfileRequest request) {
        User user = getCurrentUser();
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElse(UserProfile.builder().user(user).build());

        profile.setFullName(request.getFullName());
        profile.setBio(request.getBio());
        profile.setInstitution(request.getInstitution());
        profile.setMajor(request.getMajor());
        profile.setSemester(request.getSemester());
        profile.setCity(request.getCity());

        return userProfileRepository.save(profile);
    }
}