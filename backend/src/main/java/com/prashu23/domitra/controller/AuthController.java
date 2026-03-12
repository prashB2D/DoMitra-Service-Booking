package com.prashu23.domitra.controller;

import com.prashu23.domitra.entity.User;
import com.prashu23.domitra.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GET /auth/me
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {

        if (authentication == null) {
            return null;
        }

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");

        Optional<User> user = userRepository.findByEmail(email);

        return user.orElse(null);
    }
}