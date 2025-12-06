package com.authservice.authservice.authSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.ObjectProvider;

import com.authservice.authservice.Filter.JwtAuthFilter;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final ObjectProvider<JwtAuthFilter> jwtAuthFilterProvider;

    //Constructor injection - only inject JwtAuthFilter lazily, not UserDetailsService
    public SecurityConfig(ObjectProvider<JwtAuthFilter> jwtAuthFilterProvider) {
        this.jwtAuthFilterProvider = jwtAuthFilterProvider;
    }

     @Bean
    public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
    }
 
    @Bean
    public AuthenticationProvider daoAuthenticationProvider(UserDetailsService userDetailsService
        ,BCryptPasswordEncoder passwordEncoder) {
        // It is used by the AuthenticationManager to perform authentication.
        // Here we are configuring it with our custom userDetailsService and password encoder.
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }


  @Bean
    SecurityFilterChain filterChain(HttpSecurity http,
        AuthenticationProvider authenticationProvider
    ) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

            //unauthenticated access to this endpoint
            .requestMatchers("/authentication/**").permitAll()
            .anyRequest().authenticated()
        )   .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilterProvider.getObject(),UsernamePasswordAuthenticationFilter.class).build();
            // JWT filters are used to validate the token and set authentication in the security context
}

    //authentication manager bean to be used in authcontroller
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
        throws Exception {
    return authConfig.getAuthenticationManager();
    }    
}
