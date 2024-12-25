package com.chat.app.rest.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Bean for password encoding
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder is used to hash passwords securely
        return new BCryptPasswordEncoder();
    }

    // Bean for configuring the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF (Cross-Site Request Forgery) protection
                // Useful for APIs where the client (a frontend) is trusted,
                // but ensure this is safe for this use case.
                .csrf(AbstractHttpConfigurer::disable)

                // Configure authorization rules for HTTP requests
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to specific endpoints for registering, logging in, and logging out
                        .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/logout").permitAll()
                        // Require authentication for every other request
                        .anyRequest().authenticated()
                )

                // Configure session management
                .sessionManagement(session -> session
                        // Force creation of a session for every request to ensure the server sets a JSESSIONID cookie
                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS))

                // Enable HTTP Basic authentication
                // Simple mechanism for authenticating API requests by sending credentials with every request.
                .httpBasic(Customizer.withDefaults());

        // Build the configured SecurityFilterChain object
        return http.build();
    }
}
