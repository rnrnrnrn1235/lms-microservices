package com.ghada.library.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ghada.library.JwtFilter.JwtFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecConfiguration {

    private final JwtFilter jwtfilter;

    public SecConfiguration(JwtFilter jwtFilter){
        this.jwtfilter =jwtFilter;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
     throws Exception {

        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/library/books/**").authenticated()
                        .requestMatchers("/library/adminDashboard/**").hasAnyRole("ADMIN")
                        .requestMatchers("/library/**").authenticated()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtfilter, UsernamePasswordAuthenticationFilter.class);

                //.httpBasic(withDefaults());

        return http.build();

    }
}