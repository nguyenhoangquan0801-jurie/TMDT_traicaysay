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
    public UserDetails loadUserByUsername(String loginInput) throws UsernameNotFoundException {
        // Tìm trong DB xem 'loginInput' trùng với email hay username của ai không
        User user = userRepository.findByEmailOrUsername(loginInput, loginInput)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với: " + loginInput));

        // Trả về đối tượng UserDetails hợp lệ cho Spring Security
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail()) 
                .password(user.getPassword())
                .roles(user.getRole()) // 👈 Đã tinh gọn: Nhận trực tiếp "USER" / "ADMIN" từ DB sạch
                .build();
    }
}