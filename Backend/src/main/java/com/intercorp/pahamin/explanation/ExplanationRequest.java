package com.intercorp.pahamin.explanation;

import lombok.Data;

@Data
public class ExplanationRequest {
    private String rawText;
    private String style; // casual, analogy, stepbystep
}