package com.intercorp.pahamin.task;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank
    private String title;

    private String description;

    private boolean urgent;

    private boolean important;

    private LocalDate deadline;
}