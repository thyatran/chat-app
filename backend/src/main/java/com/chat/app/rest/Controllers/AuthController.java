package com.chat.app.rest.Controllers;

import com.chat.app.rest.Models.User;
import com.chat.app.rest.Repos.UserRepo;
import com.chat.app.rest.Requests.LoginRequest;
import com.chat.app.rest.Requests.RegistrationRequest;
import com.chat.app.rest.Responses.AuthResponse;
import com.chat.app.rest.Responses.UserResponse;
import com.chat.app.rest.Services.JWTService;
import com.chat.app.rest.Services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService service;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    private AuthenticationManager authManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegistrationRequest request, HttpServletResponse response) {

        if (request.getPassword() == null || request.getConfirmPassword() == null
                || !request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error: Password and Confirm Password do not match.", null));
        }

//        System.out.println("Password: " + request.getPassword());
//        System.out.println("Confirm Password: " + request.getConfirmPassword());

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(request.getPassword());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());
        service.register(newUser);

        String token = service.verify(request.getUsername(), request.getPassword());

        UserResponse userResponse = new UserResponse(newUser.getId(), newUser.getUsername(), null);

        Cookie jwtCookie = new Cookie("jwt", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(60 * 60 * 10);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new AuthResponse("User registered successfully.", userResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User user = userRepo.findByUsername(request.getUsername());

        if (user == null) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error: Incorrect username", null));
        }

        String token = service.verify(request.getUsername(), request.getPassword());

        if ("fail".equals(token)) {
            return ResponseEntity.badRequest().body(new AuthResponse("Error: Invalid password", null));
        }

        UserResponse userResponse = new UserResponse(
            user.getId(), user.getUsername(), user.getProfilePicUrl());

        Cookie jwtCookie = new Cookie("jwt", token);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(60 * 60 * 10);
        response.addCookie(jwtCookie);

        //System.out.println("Stored Password (hashed from db): " + user.getPassword());
        //System.out.println("Provided Password (raw from user request): " + request.getPassword());

        System.out.println(token);

        return ResponseEntity.ok(new AuthResponse("Login successfully", userResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {

        Cookie jwtCookie = new Cookie("jwt", null);
        jwtCookie.setHttpOnly(false);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok("Logout successful.");
    }
}
