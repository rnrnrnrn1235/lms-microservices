package com.ghada.library.libraryService;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ghada.library.libraryModel.User;
import com.ghada.library.libraryRepository.UserRepository;

@Service
public class adminService {

    @Autowired
    private UserRepository userRepository;

       private static final Set<String> ALLOWED_ROLES = Set.of(
        "ROLE_USER",
        "ROLE_ADMIN",
        "ROLE_LIBRARIAN"
);

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    
    public User updateRoles(String id, List<String> roles){
        
        if (roles == null || roles.isEmpty()) {
        throw new IllegalArgumentException("Roles list cannot be empty");
    }
        for (String role : roles) {
        if (!ALLOWED_ROLES.contains(role)) {
            throw new IllegalArgumentException("Invalid role: " + role);
            }
        }
        User user = userRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("User not found"));
        user.setRole(roles);
        return userRepository.save(user);
    }
    public User updateName(String id,String userName){
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(userName);
        return userRepository.save(user);
    }
    public void deleteUser(String id){
        userRepository.deleteById(id);
    }
    public List<User> searchByUsername(String name) {
    return userRepository.findByUsernameIgnoreCase(name);
    }
    //To be fixed to findById()
     public void syncUserIfNotExists(String username, List<String> roles, String id) {
        userRepository.findByUsername(username)
            .orElseGet(() -> {
                User u = new User();
                u.setUsername(username);
                u.setRole(roles);
                u.setId(id);
                return userRepository.save(u);
            }); 
        }

        //for elevated operations
    public User getOrSyncUser(String username, List<String> roles, String id) {
        syncUserIfNotExists(username, roles, id);
        return userRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("User not found"));
    }

} 
