package com.chat.app.rest.Controllers;

import com.chat.app.rest.Models.Conversations;
import com.chat.app.rest.Models.Messages;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/send")
public class MessagesController {

    // POST request send message
    @PostMapping("/{id}")
    public ResponseEntity<String> sendMessage(@PathVariable Integer id, @RequestBody String message) {

        Conversations convo = new Conversations();

        Messages newMessage = new Messages();
        newMessage.setContent("aaa");


        return ResponseEntity.ok("POST");
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getMessages() {

        return ResponseEntity.ok("GET");
    }

    // routing: /api/messages
    // get: /:id
    // post: /send/:id
}
