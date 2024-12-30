package com.chat.app.rest.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    @GetMapping("/")
    public String greet(HttpServletRequest request) {
        return "Welcome";
    }
//
//    private final UserService userService;
//
//    public UserApiController(UserService userService) {
//        this.userService = userService;
//    }
//
//    // GET all users
//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers(@RequestParam String loggedInUsername) {
//        if (loggedInUsername == null || loggedInUsername.isEmpty()) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        List<User> allUsers = userService.getAllUsers();
//
//        // Filter out the logged-in user
//        List<User> filteredUsers = allUsers.stream()
//                .filter(user -> user.getUsername() != null && !user.getUsername().equals(loggedInUsername))
//                .collect(Collectors.toList());
//
//        return ResponseEntity.ok(filteredUsers);
//    }
}
