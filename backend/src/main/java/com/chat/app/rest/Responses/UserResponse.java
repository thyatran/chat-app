package com.chat.app.rest.Responses;

public class UserResponse {
    private Integer id;
    private String username;
    private String profilePicUrl;

    public UserResponse(Integer id, String username, String profilePicUrl) {
        this.id = id;
        this.username = username;
        this.profilePicUrl = profilePicUrl;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }
}
