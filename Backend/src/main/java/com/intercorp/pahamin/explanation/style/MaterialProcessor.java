package com.intercorp.pahamin.explanation.style;

import org.springframework.stereotype.Component;

@Component
public class MaterialProcessor {

    private String rawText;
    private ExplanationStyle selectedStyle;

    public void setRawText(String text) {
        this.rawText = text;
    }

    public void setStyle(ExplanationStyle style) {
        this.selectedStyle = style;
    }

    public String process() {
        if (selectedStyle == null || rawText == null) {
            return rawText;
        }
        return selectedStyle.generateExplanation(rawText);
    }
}