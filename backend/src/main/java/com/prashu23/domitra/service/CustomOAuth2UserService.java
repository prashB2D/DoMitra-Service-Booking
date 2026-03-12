package com.prashu23.domitra.service;

import com.prashu23.domitra.entity.User;
import com.prashu23.domitra.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        System.out.println("✅ CustomOAuth2UserService bean created");
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Get user info from Google
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        // Check if user already exists in DB
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isEmpty()) {
            // New user — save to DB
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setProfilePicture(picture);
            newUser.setRole(User.Role.USER);
            newUser.setStatus(User.Status.ACTIVE);
            newUser.setAuthProvider("GOOGLE");
            newUser.setCreatedAt(LocalDateTime.now());
            newUser.setUpdatedAt(LocalDateTime.now());
            userRepository.save(newUser);
            System.out.println("✅ New user saved to DB: " + email);
        } else {
            System.out.println("✅ Existing user logged in: " + email);
        }

        return oAuth2User;
    }
}