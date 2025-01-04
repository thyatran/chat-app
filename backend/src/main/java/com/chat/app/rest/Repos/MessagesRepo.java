package com.chat.app.rest.Repos;

import com.chat.app.rest.Models.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessagesRepo extends JpaRepository<Messages, Integer> {
    List<Messages> findByConversationId(Integer conversationId);
}
