package com.prashu23.domitra.config;

import com.prashu23.domitra.service.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {
        this.customOAuth2UserService = customOAuth2UserService;
        System.out.println("✅ SecurityConfig bean created");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // anyone can search and view services
                .requestMatchers(HttpMethod.GET, "/services/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                // only logged in users can create a service or reveal contact
                .requestMatchers(HttpMethod.POST, "/services").authenticated()
                .requestMatchers(HttpMethod.POST, "/services/*/contact").authenticated()
                // everything else requires login
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
            );

        return http.build();
    }
}