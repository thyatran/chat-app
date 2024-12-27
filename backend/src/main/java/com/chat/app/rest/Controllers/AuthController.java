package com.chat.app.rest.Controllers;

import com.chat.app.rest.Models.User;
import com.chat.app.rest.Repos.UserRepo;
import com.chat.app.rest.Requests.LoginRequest;
import com.chat.app.rest.Requests.RegistrationRequest;
import com.chat.app.rest.Responses.AuthResponse;
import com.chat.app.rest.Responses.UserResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // POST: Hash password and confirmation when registering a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        // check if password and confirmation password match
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Error: Password and Confirm Password do not match.");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create and save user
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPasswordHash(hashedPassword);
        userRepo.save(newUser);

        return ResponseEntity.ok("User registered successfully.");
    }

    // POST: Login authentication
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest request) {
        Optional<User> optionalUser = userRepo.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid username or email.", null));
        }

        User user = optionalUser.get();

        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid password", null));
        }

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getProfilePicUrl()
        );

        AuthResponse authResponse = new AuthResponse("Login successful", userResponse);

        return ResponseEntity.ok(authResponse);
    }

    // Logout user
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession(false);
        if (session != null) {
            // Invalidate the session
            session.invalidate();
        }

        // Clear JSESSIONID cookie
        Cookie cookie = new Cookie("JSESSIONID", null); // Setting the cookie value to null
        cookie.setPath("/"); // Set the path of the cookie
        cookie.setHttpOnly(true); // Ensure the cookie is not accessible via JavaScript
        cookie.setMaxAge(0); // Expire immediately
        response.addCookie(cookie);

        return ResponseEntity.ok("Logout successful.");
    }
}
