package com.prashu23.domitra.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {

        String email = "";
        String name = "";
        
        // FIX: Get actual email from Google attributes
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            OAuth2User oAuth2User = oauthToken.getPrincipal();
            
            email = oAuth2User.getAttribute("email");      // ✅ Gets real email
            name = oAuth2User.getAttribute("name");        // ✅ Gets user's name
            
            System.out.println("✅ User email: " + email);
            System.out.println("✅ User name: " + name);
        } else {
            email = authentication.getName();              // Fallback
        }
        
        // Redirect with REAL email
        String redirectUrl = "http://localhost:5173/dashboard?login=success&email=" + email + "&name=" + name;
        response.sendRedirect(redirectUrl);
        
        System.out.println("✅ Redirecting to dashboard with email: " + email);
    }
}