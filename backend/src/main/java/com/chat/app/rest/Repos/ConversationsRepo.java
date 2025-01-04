package com.chat.app.rest.Repos;

import com.chat.app.rest.Models.Conversations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConversationsRepo extends JpaRepository<Conversations, Integer> {
    Optional<Conversations> findByUser1IdAndUser2Id(Integer user1Id, Integer user2Id);

}
