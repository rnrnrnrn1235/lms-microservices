package com.ghada.library.Security;

//import java.util.Base64.Decoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtService {
    private final String signingKey;

    public JwtService(@Value("${jwt.secret}") String signingkey) {
        this.signingKey = signingkey;
    }

    private Key getSignKey() {
    byte[] keybytes = Decoders.BASE64.decode(signingKey);
    return Keys.hmacShaKeyFor(keybytes);
    }
    //the generateToken method creates a JWT token for a given username

   public String generateToken(String username, List<String> roles, String id) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        claims.put("id: ", id);
        return createToken(claims, username);
    }
    
    /*public String generateToken(String username) {
        return generateToken(username, Collections.emptyList());
    }*/
    
    private String createToken(Map<String, Object> claims, String username) {
        return Jwts.builder().setClaims(claims)
        .setSubject(username).setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+ 1000*30*60))
        .signWith(getSignKey()).compact();

    } 

    private Claims extractAllClaims(String token) {
            return Jwts.parserBuilder()
            .setSigningKey(getSignKey()).build()
            .parseClaimsJws(token).getBody();
    }
        //generic method to extract any claim
        //generic da because el claim types btetghayar
        // google generics in java for more info

    public <T> T extractClaim( String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    public String extractId(String token){
        return extractClaim(token, Claims::getId);
    }
    public List<String> extractRole(String token){
        
        Claims claims = extractAllClaims(token);
        Object rolesObj = claims.get("roles");
        if (rolesObj instanceof List<?>) {
            return ((List<?>) rolesObj).stream().map(Object::toString).toList();
        }
        return Collections.emptyList();
    }
    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return(username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    } 
}
