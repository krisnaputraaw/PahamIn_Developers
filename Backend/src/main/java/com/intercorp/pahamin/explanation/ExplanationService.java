package com.intercorp.pahamin.explanation;

import com.intercorp.pahamin.explanation.style.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExplanationService {

    private final CasualStyle casualStyle;
    private final AnalogyStyle analogyStyle;
    private final StepByStepStyle stepByStepStyle;
    private final MaterialProcessor materialProcessor;

    public String process(String rawText, String style) {
        materialProcessor.setRawText(rawText);

        switch (style.toLowerCase()) {
            case "casual" -> materialProcessor.setStyle(casualStyle);
            case "analogy" -> materialProcessor.setStyle(analogyStyle);
            case "stepbystep" -> materialProcessor.setStyle(stepByStepStyle);
            default -> materialProcessor.setStyle(casualStyle);
        }

        return materialProcessor.process();
    }
}