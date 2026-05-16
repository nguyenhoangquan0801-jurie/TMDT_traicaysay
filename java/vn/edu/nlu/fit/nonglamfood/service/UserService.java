package vn.edu.nlu.fit.nonglamfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.dto.UserRegisterDTO;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.model.Provider;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

@Service
// Ý NGHĨA: Đăng ký lớp này thành một Spring Bean thuộc tầng Service. 
// Nơi đây tập trung toàn bộ "logic đầu não" của dự án trước khi đổ xuống DB.
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Tiêm bộ mã hóa PasswordEncoder đã cấu hình ở SecurityConfig

    public void registerNewUser(UserRegisterDTO registerDTO) throws Exception {
        // 1. NGHIỆP VỤ: Kiểm tra Email xem đã có ai đăng ký trước đó trong hệ thống chưa
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()) {
            throw new Exception("Email này đã được sử dụng trong hệ thống!");
        }

        // 2. NGHIỆP VỤ: Kiểm tra xem 2 ô mật khẩu người dùng gõ có trùng khớp không
        if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
            throw new Exception("Mật khẩu xác nhận không trùng khớp!");
        }

        // 3. CHUYỂN ĐỔI: Chuyển dữ liệu an toàn từ DTO sang thực thể Entity User để chuẩn bị lưu
        User newUser = new User();
        newUser.setEmail(registerDTO.getEmail());
        newUser.setFullName(registerDTO.getFullName());
        
        // MÃ HÓA: Ép mật khẩu thường qua lõi băm BCrypt mã hóa một chiều bảo mật
        newUser.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        
        // ĐẶT MẶC ĐỊNH: Đăng ký tại form là LOCAL và phân quyền USER vãng lai thành thành viên
        newUser.setProvider(Provider.LOCAL);
        newUser.setRole("ROLE_USER");

        // 4. LƯU TRỮ: Ra lệnh cho JPA bắn câu lệnh SQL lưu hàng dữ liệu mới này xuống database
        userRepository.save(newUser);
    }
}