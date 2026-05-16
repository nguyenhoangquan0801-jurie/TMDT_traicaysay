package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.beans.factory.annotation.Autowired; // Thêm import để tự động tiêm Bean
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import vn.edu.nlu.fit.nonglamfood.service.CustomOAuth2UserService; // Thêm import Service xử lý Google dữ liệu khách hàng

@Configuration
// Ý NGHĨA: Đánh dấu lớp này là một lớp Cấu hình hệ thống. 
// Khi ứng dụng khởi chạy, Spring Boot sẽ đọc file này trước để định hình các cài đặt cốt lõi.

@EnableWebSecurity
// Ý NGHĨA: Kích hoạt tính năng bảo mật web (Web Security) của Spring Security. 
// Nếu không có lớp này, toàn bộ link trong dự án sẽ mở toang hoác, ai cũng vào được mà không cần đăng nhập.
public class SecurityConfig {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService; 
    // LỆNH MỚI: Tiêm bộ xử lý OAuth2 vào đây để Spring Security gọi phục vụ khi có người dùng đăng nhập bằng Google.

    @Bean
    // Ý NGHĨA: Đăng ký một phương thức làm Spring Bean. Kết quả trả về của hàm này sẽ được đưa vào vùng nhớ container để các class khác (như DataInitializer, UserService) gọi ra dùng thông qua @Autowired.
    public PasswordEncoder passwordEncoder() {
        // CẬP NHẬT: Thay đổi kiểu trả về thành PasswordEncoder cho đồng bộ và an toàn hệ thống.
        // Trả về cơ chế mã hóa một chiều bằng thuật toán BCrypt cực mạnh, tự động tạo muối (salt) bảo mật.
        return new BCryptPasswordEncoder();
    }

    @Bean
    // Ý NGHĨA: Đăng ký một chuỗi các lõi lọc (Filter Chain) để kiểm soát mọi request (yêu cầu gửi đến) từ trình duyệt xem có hợp lệ, được phép truy cập hay không.
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // LỆNH 1: Tạm thời tắt cơ chế chống giả mạo request CSRF để thuận tiện cho việc gọi API cục bộ hoặc sử dụng H2 Database Console.
            .csrf(csrf -> csrf.disable()) 
            
            // LỆNH 2: Phân quyền chi tiết cho từng đường dẫn (URL) cụ thể
            .authorizeHttpRequests(auth -> auth
                // CẬP NHẬT: Đã bổ sung thêm đường dẫn "/register" vào danh sách công khai.
                // Giờ đây bất kỳ ai (kể cả khách chưa có tài khoản) cũng có thể truy cập tự do vào trang Đăng ký.
                .requestMatchers("/", "/register", "/login", "/h2-console/**", "/css/**", "/assets/**").permitAll()
                
                // Tất cả các request/đường dẫn khác ngoài danh sách trên (ví dụ: /profile, /checkout...) BẮT BUỘC phải đăng nhập mới xem được.
                .anyRequest().authenticated()
            )
            
            // LỆNH 3: Cấu hình hệ thống Đăng nhập thông thường bằng tài khoản & mật khẩu cục bộ (Form Login)
            .formLogin(form -> form
                // Chỉ định URL hiển thị trang đăng nhập tùy biến của bạn là "/login" (Thay vì dùng trang xấu xí mặc định của Spring).
                .loginPage("/login")             
                
                // ÉP BUỘC: Sau khi đăng nhập thành công, hệ thống bắt buộc phải đẩy thẳng người dùng về trang chủ "/" (Tham số true).
                .defaultSuccessUrl("/", true) 
                
                // Đổi tên tham số nhận diện tài khoản từ mặc định "username" thành "email" để khớp với Form HTML của bạn.
                .usernameParameter("email")      
                
                // Cho phép bất cứ ai cũng được quyền truy cập vào các tài nguyên phục vụ đăng nhập.
                .permitAll()
            )
            
            // LỆNH 4: Cấu hình hệ thống Đăng nhập thông qua bên thứ 3 - Mạng xã hội GOOGLE (OAuth2 Login)
            .oauth2Login(oauth2 -> oauth2
                // Nếu người dùng chọn đăng nhập Google, trang mồi cũng chính là trang "/login" của bạn.
                .loginPage("/login")             
                
                // Tương tự, xác thực tài khoản Google xong, hệ thống cũng cưỡng chế người dùng quay trở lại trang chủ "/".
                .defaultSuccessUrl("/", true)  
                
                // CẬP NHẬT MỚI: Cấu hình điểm cuối nhận diện thông tin (User Info Endpoint) để chặn dữ liệu trả về từ Google
                .userInfoEndpoint(userInfo -> userInfo
                    // Chỉ định hệ thống gọi lớp xử lý CustomOAuth2UserService nhằm kiểm tra và tự động lưu thông tin user vào database
                    .userService(customOAuth2UserService)
                )
            )
            
            // LỆNH 5: Cấu hình chức năng Đăng xuất (Logout) khỏi ứng dụng
            .logout(logout -> logout
                // Đường dẫn URL kích hoạt hành động đăng xuất (Khi user bấm nút Đăng xuất).
                .logoutUrl("/logout")            
                
                // Sau khi xóa sạch session đăng xuất thành công, tự động đá người dùng về trang đăng nhập kèm tham số báo hiệu "?logout".
                .logoutSuccessUrl("/login?logout") 
                
                .permitAll()
            )
            
            // LỆNH 6: Cho phép hiển thị giao diện bên trong thẻ <iframe>. 
            // Lệnh này cực kỳ quan trọng, nếu không disable frameOptions thì khi bạn truy cập trang quản trị H2 Database Console (/h2-console) màn hình sẽ bị trắng xóa vì cơ chế bảo mật Clickjacking ngăn chặn.
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        // Tổng hợp tất cả các cấu hình trên và dựng thành bộ lọc hoàn chỉnh trả về cho Spring Boot vận hành.
        return http.build();
    }
}