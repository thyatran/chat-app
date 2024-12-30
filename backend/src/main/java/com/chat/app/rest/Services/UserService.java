package com.chat.app.rest.Services;

import com.chat.app.rest.Models.User;
import com.chat.app.rest.Repos.UserRepo;
import com.chat.app.rest.Responses.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public String verify(String username, String password) {
        try {

            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            if (authentication.isAuthenticated()) {
                return jwtService.generateToken(username);
            }
        } catch (Exception e) {

            System.err.println("Authentication failed: " + e.getMessage());
        }
            return "fail";
    }

    public List<UserResponse> getAllUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authUsername = authentication.getName();

        List<User> users = repo.findAll();

        return users.stream()
                .filter(user -> !user.getUsername().equals(authUsername))
                .map(user -> new UserResponse(user.getId(), user.getUsername(), user.getProfilePicUrl()))
                .collect(Collectors.toList());
    }
}
