package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.edu.nlu.fit.nonglamfood.model.Provider;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @Override
    public void run(String... args) throws Exception {
        
        // 💡 BƯỚC CHÍT MẠNG: Ép Java xóa sạch dữ liệu bảng users cũ (để loại bỏ hàng lỗi từ data.sql)
        userRepository.deleteAll();
        
        // Sau khi xóa sạch, tiến hành nạp tài khoản mới với mật khẩu băm chuẩn từ hệ thống hiện tại
        
        // 1. Tạo tài khoản USER
        User normalUser = new User();
        normalUser.setEmail("user@nonglamfood.com");
        normalUser.setUsername("user_nonglam");
        normalUser.setFullName("Nguyễn Văn Người Dùng");
        normalUser.setPassword(passwordEncoder.encode("123456")); // 👈 Băm trực tiếp bằng công cụ của hệ thống
        normalUser.setProvider(Provider.LOCAL); 
        normalUser.setRole("USER");
        userRepository.save(normalUser);

        // 2. Tạo tài khoản ADMIN
        User adminUser = new User();
        adminUser.setEmail("admin@nonglamfood.com");
        adminUser.setUsername("admin_nonglam");
        adminUser.setFullName("Trần Thị Quản Trị");
        adminUser.setPassword(passwordEncoder.encode("123456")); // 👈 Băm trực tiếp bằng công cụ của hệ thống
        adminUser.setProvider(Provider.LOCAL);
        adminUser.setRole("ADMIN");
        userRepository.save(adminUser);

        System.out.println("==================================================");
        System.out.println("🔥 [HỆ THỐNG] ĐÃ LÀM SẠCH VÀ TỰ ĐỘNG BẰM LẠI MẬT KHẨU MỚI!");
        System.out.println("👉 Đăng nhập (USER):  user_nonglam  | Pass: 123456");
        System.out.println("👉 Đăng nhập (ADMIN): admin_nonglam | Pass: 123456");
        System.out.println("==================================================");
    }
}