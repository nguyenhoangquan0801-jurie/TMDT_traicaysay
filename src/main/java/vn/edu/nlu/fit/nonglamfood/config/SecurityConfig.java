package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import vn.edu.nlu.fit.nonglamfood.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService; 

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Tắt cơ chế chống giả mạo request CSRF để H2 Console hoạt động bình thường
            .csrf(csrf -> csrf.disable()) 
            
            // 2. Cấu hình phân quyền đường dẫn hệ thống
            .authorizeHttpRequests(auth -> auth
                // 💡 ĐÃ SỬA: Dùng chuỗi thuần gọn gàng, loại bỏ hoàn toàn class AntPathRequestMatcher gây lỗi gạch đỏ
                .requestMatchers("/h2-console/**").permitAll()
                
                // Các tài nguyên tĩnh và trang chức năng công khai
                .requestMatchers("/", "/register", "/login", "/css/**", "/js/**", "/assets/**").permitAll()
                
                // Tất cả các yêu cầu còn lại bắt buộc phải đăng nhập
                .anyRequest().authenticated()
            )
            
            // 3. Cấu hình hệ thống Form Login cục bộ
            .formLogin(form -> form
                .loginPage("/login")            
                .defaultSuccessUrl("/", true) 
                .permitAll()
            )
            
            // 4. Cấu hình hệ thống OAuth2 Login qua Google
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")            
                .defaultSuccessUrl("/", true)  
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
            )
            
            // 5. Cấu hình chức năng Đăng xuất
            .logout(logout -> logout
                .logoutUrl("/logout")            
                .logoutSuccessUrl("/login?logout") 
                .permitAll()
            )
            
            // 6. Cho phép hiển thị H2 Console trong thẻ <iframe> mà không bị chặn bảo mật Clickjacking
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}