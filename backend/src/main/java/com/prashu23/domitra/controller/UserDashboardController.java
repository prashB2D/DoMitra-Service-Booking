package com.prashu23.domitra.controller;

import com.prashu23.domitra.entity.Service;
import com.prashu23.domitra.entity.User;
import com.prashu23.domitra.service.UserDashboardService;
import com.prashu23.domitra.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserDashboardController {

    private final UserRepository userRepository;
    private final UserDashboardService dashboardService;

    public UserDashboardController(UserRepository userRepository,
                                   UserDashboardService dashboardService) {
        this.userRepository = userRepository;
        this.dashboardService = dashboardService;
    }

    @GetMapping("/me/services")
    public List<Map<String, Object>> getMyServices(Authentication authentication) {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Service> services = dashboardService.getUserServices(user.getId());

        List<Map<String, Object>> result = new ArrayList<>();

        for (Service s : services) {

            Map<String, Object> data = new HashMap<>();

            data.put("id", s.getId());
            data.put("title", s.getTitle());
            data.put("city", s.getCity());

            data.put("views", dashboardService.getViews(s.getId()));
            data.put("contacts", dashboardService.getContacts(s.getId()));

            result.add(data);
        }

        return result;
    }
}