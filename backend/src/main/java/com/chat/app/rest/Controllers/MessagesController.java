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

import java.util.List;

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
        String content = request.getMessage();
        Integer senderId = userService.getLoggedinUserId();
        System.out.println("logged in user / sender Id: " + senderId);
        System.out.println("content " + content);

        Conversations conversation = conversationsRepo.findByUser1IdAndUser2Id(senderId, id)
                .orElseGet(() -> {
                    Conversations newConversation = new Conversations();
                    newConversation.setUser1Id(senderId);
                    newConversation.setUser2Id(id);
                    return conversationsRepo.save(newConversation);
                });


        Messages newMessage = new Messages();
        newMessage.setConversation(conversation);
        newMessage.setSenderId(senderId);
        newMessage.setContent(content);
        messagesRepo.save(newMessage);

        return ResponseEntity.ok("Message sent successfully.");
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<Messages>> getConversation(@PathVariable Integer conversationId) {
        List<Messages> messages = messagesRepo.findByConversationId(conversationId);
        return ResponseEntity.ok(messages);
    }
}
