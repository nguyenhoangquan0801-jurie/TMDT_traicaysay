package vn.edu.nlu.fit.nonglamfood.config;

import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import vn.edu.nlu.fit.nonglamfood.security.CustomOAuth2UserService;
import vn.edu.nlu.fit.nonglamfood.security.OAuth2SuccessHandler;
import vn.edu.nlu.fit.nonglamfood.security.JwtAuthenticationFilter;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final OAuth2SuccessHandler successHandler;
        private final CustomOAuth2UserService customOAuth2UserService;
        private final JwtAuthenticationFilter jwtFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http)
                        throws Exception {

                http
                        .cors(Customizer.withDefaults())
                        .csrf(csrf -> csrf.disable())


                        .authorizeHttpRequests(auth -> auth

                                .requestMatchers(
                                        "/oauth2/**",
                                        "/login/**",
                                        "/api/auth/login",
                                        "/api/auth/register",
                                        "/api/auth/forgot-password",
                                        "/api/auth/verify-otp",
                                        "/api/auth/reset-password"
                                ).permitAll()

                                .requestMatchers("/api/admin/**")
                                .hasRole("ADMIN")

                                .requestMatchers("/api/seller/**")
                                .hasRole("SELLER")

                                .requestMatchers("/api/customer/**")
                                .hasRole("CUSTOMER")

                                .anyRequest()
                                .authenticated()
                        )

                .oauth2Login(oauth -> oauth

                        .userInfoEndpoint(user ->
                                user.userService(customOAuth2UserService)
                        )

                        .successHandler(successHandler)
                )

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration =
                        new CorsConfiguration();

                configuration.setAllowedOrigins(List.of(
                        "http://localhost:3000"
                ));

                configuration.setAllowedMethods(List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                ));

                configuration.setAllowedHeaders(List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source =
                        new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration("/**", configuration);

                return source;
        }

}