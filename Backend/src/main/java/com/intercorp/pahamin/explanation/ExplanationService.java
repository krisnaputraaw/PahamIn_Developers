package com.intercorp.pahamin.explanation;

import org.springframework.stereotype.Service;

@Service
public class ExplanationService {

    public String process(String rawText, String style) {
        return switch (style.toLowerCase()) {
            case "casual" -> convertToCasual(rawText);
            case "analogy" -> insertAnalogy(rawText);
            case "stepbystep" -> splitIntoSteps(rawText);
            default -> rawText;
        };
    }

    private String convertToCasual(String text) {
        return "Oke jadi gini, " + text
                .replace("adalah", "tuh")
                .replace("merupakan", "itu")
                .replace("tersebut", "itu")
                .replace("dalam", "di")
                .replace("dapat", "bisa")
                .replace("melakukan", "lakuin")
                .replace("menggunakan", "pake")
                .replace("sehingga", "jadi")
                .replace("namun", "tapi")
                .replace("karena", "soalnya");
    }

    private String insertAnalogy(String text) {
        return "Bayangin gini: " + text +
                "\n\nGampangnya, ini kayak kehidupan sehari-hari — " +
                "konsep ini bekerja dengan cara yang sama seperti hal-hal yang udah kamu kenal.";
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