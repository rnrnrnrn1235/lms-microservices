package com.authservice.authservice.authService;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.authservice.authservice.authModel.UserInfo;
import com.authservice.authservice.authRepository.AuthRepository;
import com.authservice.authservice.authRequests.AuthRequest;

@Service
public class UserInfoService implements UserDetailsService {

        //final is used to make sure these dependencies are not changed after initialization
        //once per instance of the service per application lifecycle (singleton scope is the default in Spring)
        //meaning the same instance is used throughout the application lifecycle
        private final AuthRepository userRepository;
        private final BCryptPasswordEncoder passwordEncoder;


        public UserInfoService(AuthRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
        }
        
        //passes entity to UserInfoDetails constructor to adapt it to UserDetails interface
        //then returns UserDetails object
        //used by authenticationManager if userdetails doesn't exist 
        //it will throw either classCastException or no userDetails configured
        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            Optional<UserInfo> userinfo = userRepository.findByUsername(username);
            if (userinfo.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }
            UserInfo user = userinfo.get();

            //Tests to be removed.
           System.out.println("Loaded user: " + user.getUsername());
           System.out.println("User id: " + user.getId());
            System.out.println("Password from DB: " + user.getPassword());
            System.out.println("Roles: " + user.getRole());

           return new UserInfoDetails(user);
    }
        public HttpStatus registerUser(AuthRequest authRequest) {
            // Check if username already exists
            Optional<UserInfo> existingUser = userRepository.findByUsername(authRequest.getUsername());
            if (existingUser.isPresent()) {
                return HttpStatus.CONFLICT; 
            }
            UserInfo userinfo = new UserInfo();
            userinfo.setUsername(authRequest.getUsername());
            userinfo.setPassword(authRequest.getPassword());
            // Ensure we don't accept role from client: server assigns default ROLE_USER
            userinfo.setRole("ROLE_USER");
            // Ensure id is null so Mongo will generate one
            userinfo.setId(null);
            // Encode the password before saving
            userinfo.setPassword(passwordEncoder.encode(userinfo.getPassword()));
            userRepository.save(userinfo);
            return HttpStatus.CREATED; 

        }
}