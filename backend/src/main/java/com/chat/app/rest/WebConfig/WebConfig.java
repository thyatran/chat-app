package com.chat.app.rest.WebConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMapping(CorsRegistry registry) {
//        registry.addMapping("/**") // Allow CORS for all endpoints
//                .allowedOrigins("http://localhost:3000") // Allow requests from React app
//                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these methods
//                .allowedHeaders("*"); // Allow any headers
//    }
}
