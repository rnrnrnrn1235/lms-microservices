package com.authservice.authservice.authService;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.authservice.authservice.authModel.UserInfo;

//takes userinfo entity and adapts it to UserDetails interface used by spring security

public class UserInfoDetails implements UserDetails {
    private final String username;
    private final String password;
    private final String id;
    private final List<GrantedAuthority> authorities;

    public UserInfoDetails(UserInfo userInfo) {
        this.username = userInfo.getUsername();
        this.password = userInfo.getPassword();
        this.id = userInfo.getId();
        this.authorities = List.of(userInfo.getRole().split(",")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()); 

    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked(){
        return true;
    
    }
    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }
    @Override
    public boolean isEnabled(){
        return true;
    }
     public String getId(){
        return id;
    }
}
