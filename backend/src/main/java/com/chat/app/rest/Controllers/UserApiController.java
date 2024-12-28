package com.chat.app.rest.Controllers;

import com.chat.app.rest.Models.User;
import com.chat.app.rest.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    // GET all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestParam String loggedInUsername) {
        if (loggedInUsername == null || loggedInUsername.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<User> allUsers = userService.getAllUsers();

        // Filter out the logged-in user
        List<User> filteredUsers = allUsers.stream()
                .filter(user -> user.getUsername() != null && !user.getUsername().equals(loggedInUsername))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredUsers);
    }
}
