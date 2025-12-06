package com.ghada.library.libraryModel;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
public class User {
    
  
    private String username;
    private String id; 
    // private String email;
    private List<String> role;

      public User() {
    }
    public User(String id, String username, List<String> role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

      public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public List<String> getRole() {
        return this.role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }

  /*public String getEmail() {
        return this.email;
    }
    @Email(message = "EMAIL SHOUD BE VALID")
    public void setEmail(String email) {
        this.email = email;
    }*/

}

