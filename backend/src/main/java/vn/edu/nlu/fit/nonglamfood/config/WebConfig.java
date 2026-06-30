package vn.edu.nlu.fit.nonglamfood.config; // Nhớ đổi đúng package của bạn nhé

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 1. Cho phép thông tin xác thực (cookies, headers, etc.)
        config.setAllowCredentials(true);
        
        // 2. Cho phép chính xác nguồn từ React Front-end
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        
        // 3. Cho phép tất cả các Headers gửi lên
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // 4. Cho phép các phương thức, đặc biệt bao gồm OPTIONS để fix lỗi preflight
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 5. Áp dụng cấu hình này cho mọi API đường dẫn bắt đầu bằng /**
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}