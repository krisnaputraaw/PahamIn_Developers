package com.intercorp.pahamin.user;

import lombok.Data;

@Data
public class UserProfileRequest {
    private String fullName;
    private String bio;
    private String institution;
    private String major;
    private Integer semester;
    private String city;
    private String nickname;
    private String avatarUrl;
    private Integer filesUploaded;
    private Integer quizCompleted;
    private String avgPerDay;
    private String email;
}