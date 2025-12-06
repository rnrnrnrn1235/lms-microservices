package com.ghada.library.libraryController;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ghada.library.Security.JwtService;
import com.ghada.library.libraryService.adminService;


@RestController
@RequestMapping("/library/home")
public class Home {
    private final JwtService jwtService;
    private final adminService adminService;

    public Home(JwtService jwtService, adminService adminService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<String> welcome(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        String id = jwtService.extractId(token);
        List<String> roles = jwtService.extractRole(token);

        adminService.syncUserIfNotExists(username, roles, id); // safe, happens only once per user

        return ResponseEntity.status(HttpStatus.OK).body("Welcome, " + username); 
    } 
}
 