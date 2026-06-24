package com.intercorp.pahamin.explanation.style;

import org.springframework.stereotype.Component;

@Component
public class CasualStyle implements ExplanationStyle {

    @Override
    public String generateExplanation(String rawText) {
        return convertToCasual(rawText);
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
}