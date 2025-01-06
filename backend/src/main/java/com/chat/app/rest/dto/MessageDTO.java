package com.chat.app.rest.dto;

import com.chat.app.rest.Models.Messages;

import java.util.Date;

/*Since your Messages entity contains a conversation field marked with @JsonBackReference,
the conversation_id won't appear in the serialized JSON response.
 */
public class MessageDTO {
    private Integer id;
    private Integer conversationId;
    private Integer senderId;
    private String content;
    private Date createdAt;

    public MessageDTO(Messages message) {
        this.id = message.getId();
        //this.conversationId = message.getConversation().getId();
        this.senderId = message.getSenderId();
        this.content = message.getContent();
        this.createdAt = message.getCreatedAt();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
