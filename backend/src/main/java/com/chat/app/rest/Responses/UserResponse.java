package com.chat.app.rest.Responses;

public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String profilePicUrl;

    public UserResponse(Long id, String username, String email, String profilePicUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePicUrl = profilePicUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }
}
