package com.chat.app.rest.Controllers;

import com.chat.app.rest.Responses.UserResponse;
import com.chat.app.rest.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    @Autowired
    private UserService userService;

    // GET all users
    @GetMapping("/")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/greet")
    public String greet() {
        return "Hello there";
    }

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
