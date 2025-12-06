package com.ghada.library.libraryController;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import com.ghada.library.libraryModel.User;
import com.ghada.library.libraryService.adminService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/library/adminDashboard")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final adminService adminService;

    public UserController(adminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }
    @GetMapping("users/search")
    public List<User> searchByUsername(@RequestParam String name){
        return adminService.searchByUsername(name);
    }
    @PutMapping("users/{id}/username")
    public User updateUsername(@PathVariable String id, @RequestBody String name){
        return adminService.updateName(id, name);
    }
    @PutMapping("/users/{id}/roles")
    public User updateRoles(
            @PathVariable String id,
            @RequestBody List<String> roles
    ) {
        return adminService.updateRoles(id, roles);
    }
    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable String id) {
        adminService.deleteUser(id);
    }

    @GetMapping("/test")
    public String test(){
        return "TEST";
    }
}
