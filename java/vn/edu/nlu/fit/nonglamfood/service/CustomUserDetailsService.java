package vn.edu.nlu.fit.nonglamfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Tìm user theo email dưới DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy email: " + email));

        // Cập nhật chuẩn Spring Boot 4+: Sử dụng hệ thống Builder để đóng gói thông tin tài khoản
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword()) // Lấy mật khẩu đã Bcrypt từ DB
                .roles(user.getRole().replace("ROLE_", "")) // Spring Security 6+ tự thêm tiền tố ROLE_, nên ta cắt chữ cũ đi nếu có để tránh trùng lặp thành ROLE_ROLE_USER
                .build();
    }
}