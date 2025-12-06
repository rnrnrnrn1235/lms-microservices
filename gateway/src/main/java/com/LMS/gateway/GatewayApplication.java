package com.LMS.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@SpringBootApplication
@EnableConfigurationProperties(GatewayUriConfiguration.class)
@RestController
public class GatewayApplication {

    @Bean
    // creates routes for microservices
    public RouteLocator myRoutes(RouteLocatorBuilder builder, GatewayUriConfiguration uriConfiguration) {
	String authUri = uriConfiguration.getAuthServiceUri();
	String libraryUri = uriConfiguration.getLibraryServiceUri();

	// Routing strategy kal2aty:
	// /authentication/** -> auth service (login/registration endpoints)
	// /library/** when Authorization is confirmed -> forward to library service
	// /library/** when !Authorization -> forward to auth service (so callers can authenticate first)

	return builder.routes()
	.route("auth-route", r -> r.path("/authentication/**").filters(f -> f
                .circuitBreaker(config -> config
                .setName("auth-cb")
                .setFallbackUri("forward:/fallback"))
				)
            .uri(authUri))

        // LIBRARY SERVICE
        .route("library-route", r -> r.path("/library/**").filters(f -> f
                .circuitBreaker(config -> config
                .setName("library-cb")
                .setFallbackUri("forward:/fallback")) 
			)
            .uri(libraryUri))

        // ROOT → LOGIN
           .route("root-redirect", r -> r.path("/", "/login")
            .filters(f -> f.redirect(302, authUri + "/authentication/login"))
            .uri("http://localhost"))

        .build();
	
    }
	
@RequestMapping("/fallback")
public Mono<String> fallback() {
	return Mono.just("Service is taking longer than expected. Please try again later.");
}

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

}
