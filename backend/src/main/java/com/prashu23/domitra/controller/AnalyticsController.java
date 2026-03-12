package com.prashu23.domitra.controller;

import com.prashu23.domitra.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
        System.out.println("✅ AnalyticsController bean created");
    }

    // GET /services/{id}/analytics
    @GetMapping("/{id}/analytics")
    public ResponseEntity<Map<String, Long>> getAnalytics(@PathVariable Long id) {
        Map<String, Long> analytics = new HashMap<>();
        analytics.put("views", analyticsService.getViewCount(id));
        analytics.put("contactClicks", analyticsService.getContactClickCount(id));
        return ResponseEntity.ok(analytics);
    }
}