package com.intercorp.pahamin.explanation.style;

import org.springframework.stereotype.Component;

@Component
public class AnalogyStyle implements ExplanationStyle {

    @Override
    public String generateExplanation(String rawText) {
        return insertAnalogy(rawText);
    }

    private String insertAnalogy(String text) {
        return "Bayangin gini: " + text +
                "\n\nGampangnya, ini kayak kehidupan sehari-hari — " +
                "konsep ini bekerja dengan cara yang sama seperti hal-hal yang udah kamu kenal.";
    }
}