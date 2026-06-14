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
}