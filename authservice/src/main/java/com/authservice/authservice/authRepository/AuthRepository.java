package com.authservice.authservice.authRepository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.authservice.authservice.authModel.UserInfo;

public interface AuthRepository extends MongoRepository<UserInfo, String> {
    Optional<UserInfo> findByUsername(String username); //use username to find user details
} 