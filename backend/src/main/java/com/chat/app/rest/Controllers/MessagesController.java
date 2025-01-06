package com.chat.app.rest.Controllers;

import com.chat.app.rest.Models.Conversations;
import com.chat.app.rest.Models.Messages;
import com.chat.app.rest.Repos.ConversationsRepo;
import com.chat.app.rest.Repos.MessagesRepo;
import com.chat.app.rest.Requests.MessageRequest;
import com.chat.app.rest.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    @Autowired
    private MessagesRepo messagesRepo;

    @Autowired
    private ConversationsRepo conversationsRepo;

    @Autowired
    private UserService userService;

    // POST request send message
    @PostMapping("/send/{id}")
    public ResponseEntity<String> sendMessage(@PathVariable Integer id, @RequestBody MessageRequest request) {
        try {
            String content = request.getMessage();
            Integer senderId = userService.getLoggedinUserId();

            //System.out.println("logged in user / sender id: " + senderId);
            //System.out.println("content " + content);

            Conversations conversation = conversationsRepo.findByUser1IdAndUser2Id(senderId, id)
                    .or(() -> conversationsRepo.findByUser1IdAndUser2Id(id, senderId))
                    .orElseGet(() -> {
                        Conversations newConversation = new Conversations(senderId, id);
                        return conversationsRepo.save(newConversation);
                    });

            Messages newMessage = new Messages();
            newMessage.setSenderId(senderId);
            newMessage.setReceiverId(id);
            newMessage.setContent(content);
            newMessage.setConversation(conversation);

            messagesRepo.save(newMessage);

            return ResponseEntity.ok("Message sent successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @GetMapping("/{userToChatId}")
    public ResponseEntity<?> getConversation(@PathVariable Integer userToChatId) {
        try {
            Integer senderId = userService.getLoggedinUserId();

            Optional<Conversations> conversation = conversationsRepo.findByUser1IdAndUser2Id(senderId, userToChatId)
                    .or(() -> conversationsRepo.findByUser1IdAndUser2Id(userToChatId, senderId));

            if (conversation.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            List<Messages> messages = conversation.get().getMessages();

            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }
}
