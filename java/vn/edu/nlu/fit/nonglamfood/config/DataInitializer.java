package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; // Thay bằng Interface chung cho an toàn
import org.springframework.stereotype.Component;
import vn.edu.nlu.fit.nonglamfood.model.Provider;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

@Component
// Ý NGHĨA: Đánh dấu lớp này là một Spring Bean (Cấu phần do Spring quản lý). 
// Spring Boot sẽ tự động quét thấy, khởi tạo nó và đưa vào vùng nhớ ApplicationContext khi chạy ứng dụng.

public class DataInitializer implements CommandLineRunner {
// Ý NGHĨA: Khai báo lớp này triển khai (implement) Interface "CommandLineRunner".
// Đây là một Interface đặc biệt của Spring Boot. Bất kỳ Bean nào triển khai nó đều sẽ tự động kích hoạt và chạy hàm run() NGAY LẬP TỨC sau khi toàn bộ hệ thống Spring Boot khởi chạy thành công. Thường dùng để nạp dữ liệu ban đầu hoặc chạy tác vụ setup hệ thống.

    @Autowired
    // Ý NGHĨA: Kích hoạt cơ chế Dependency Injection (Tiêm phụ thuộc) tự động của Spring.
    // Thay vì bạn phải viết `userRepository = new UserRepositoryImpl()`, Spring sẽ tự tìm Bean UserRepository thích hợp dưới DB để gán vào biến này cho bạn sử dụng.
    private UserRepository userRepository;

    @Autowired
    // Ý NGHĨA: Tự động tiêm bộ mã hóa mật khẩu đã được bạn cấu hình trong dự án vào đây để sử dụng mà không cần khởi tạo lại.
    private PasswordEncoder passwordEncoder; 

    @Override
    // Ý NGHĨA: Chỉ định rằng đây là hàm ghi đè lại logic từ Interface CommandLineRunner.
    public void run(String... args) throws Exception {
        
        // Lệnh kiểm tra: Nếu tổng số bản ghi (hàng) trong bảng users bằng 0 (Database trống rỗng)
        if (userRepository.count() == 0) {
            
            // 1. Tạo tài khoản USER thường để test chức năng cơ bản
            User normalUser = new User();
            normalUser.setEmail("user@nonglamfood.com");
            normalUser.setFullName("Nguyễn Văn Người Dùng");
            
            // LỆNH MÃ HÓA: Ép chuỗi "123456" qua thuật toán băm Bcrypt tạo ra chuỗi mã hóa không thể dịch ngược trước khi lưu xuống DB
            normalUser.setPassword(passwordEncoder.encode("123456")); 
            
            // Xác định nguồn gốc tài khoản (Đăng nhập cục bộ tại website)
            normalUser.setProvider(Provider.LOCAL); 
            
            // Gán vai trò USER cơ bản
            normalUser.setRole("ROLE_USER");
            
            // Ra lệnh cho JPA lưu thực thể này xuống Database thành một hàng trong bảng
            userRepository.save(normalUser);

            // 2. Tạo tài khoản ADMIN để kiểm thử các chức năng quản trị
            User adminUser = new User();
            adminUser.setEmail("admin@nonglamfood.com");
            adminUser.setFullName("Trần Thị Quản Trị");
            adminUser.setPassword(passwordEncoder.encode("admin123")); 
            adminUser.setProvider(Provider.LOCAL);
            
            // Gán vai trò ADMIN tối cao
            adminUser.setRole("ROLE_ADMIN");
            userRepository.save(adminUser);

            // In thông báo ra màn hình Console (Log terminal) để lập trình viên dễ theo dõi khi kiểm thử hệ thống
            System.out.println("=== ĐÃ KHỞI TẠO DỮ LIỆU ĐĂNG NHẬP ẢO THÀNH CÔNG ===");
            System.out.println("Tài khoản 1: user@nonglamfood.com / Mật khẩu: 123456");
            System.out.println("Tài khoản 2: admin@nonglamfood.com / Mật khẩu: admin123");
            System.out.println("==================================================");
        }
    }
}