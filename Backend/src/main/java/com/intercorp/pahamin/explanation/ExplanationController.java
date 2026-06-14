package com.intercorp.pahamin.explanation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExplanationController {

    private final ExplanationService explanationService;

    @PostMapping("/process")
    public ResponseEntity<Map<String, String>> process(@RequestBody ExplanationRequest request) {
        String result = explanationService.process(request.getRawText(), request.getStyle());
        return ResponseEntity.ok(Map.of("processedText", result));
    }
}