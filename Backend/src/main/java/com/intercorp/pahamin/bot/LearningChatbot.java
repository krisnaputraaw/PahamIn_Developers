package com.intercorp.pahamin.bot;

import com.intercorp.pahamin.explanation.style.AnalogyStyle;
import com.intercorp.pahamin.explanation.style.CasualStyle;
import com.intercorp.pahamin.explanation.style.MaterialProcessor;
import com.intercorp.pahamin.explanation.style.StepByStepStyle;
import com.intercorp.pahamin.user.UserProfile;

public class LearningChatbot extends PahamInBot {

    private String learningStyle;

    public LearningChatbot(String userName, UserProfile userProfile, String learningStyle) {
        super(userName, userProfile);
        this.learningStyle = learningStyle;
    }

    @Override
    public String respond(String input) {
        String detectedStyle = detectStyle(input);
        String cleanInput = removePrefix(input);
        return explainWithStyle(cleanInput, detectedStyle);
    }

    private String detectStyle(String input) {
        if (input.startsWith("/casual")) return "casual";
        if (input.startsWith("/analogy")) return "analogy";
        if (input.startsWith("/stepbystep")) return "stepbystep";
        return learningStyle;
    }

    private String removePrefix(String input) {
        if (input.startsWith("/casual ")) return input.substring(8);
        if (input.startsWith("/analogy ")) return input.substring(9);
        if (input.startsWith("/stepbystep ")) return input.substring(12);
        return input;
    }

    public String explainWithStyle(String text, String style) {
        MaterialProcessor processor = new MaterialProcessor();
        processor.setRawText(text);

        switch (style.toLowerCase()) {
            case "casual" -> processor.setStyle(new CasualStyle());
            case "analogy" -> processor.setStyle(new AnalogyStyle());
            case "stepbystep" -> processor.setStyle(new StepByStepStyle());
            default -> processor.setStyle(new CasualStyle());
        }

        return processor.process();
    }
}