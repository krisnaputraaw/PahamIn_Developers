package com.intercorp.pahamin.explanation.style;

import org.springframework.stereotype.Component;

@Component
public class StepByStepStyle implements ExplanationStyle {

    @Override
    public String generateExplanation(String rawText) {
        return splitIntoSteps(rawText);
    }

    private String splitIntoSteps(String text) {
        String[] sentences = text.split("(?<=[.!?])\\s+");
        StringBuilder result = new StringBuilder("Berikut langkah-langkahnya:\n\n");
        for (int i = 0; i < sentences.length; i++) {
            if (!sentences[i].isBlank()) {
                result.append(i + 1).append(". ").append(sentences[i].trim()).append("\n");
            }
        }
        return result.toString();
    }
}