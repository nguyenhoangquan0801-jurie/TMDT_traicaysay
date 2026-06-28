package vn.edu.nlu.fit.nonglamfood.dto;

import lombok.Data;

@Data 
// Ý NGHĨA: Annotation của Lombok tự động sinh ngầm các hàm Getter, Setter, toString() 
// giúp code ngắn gọn và tránh lỗi vỡ cấu hình khi Thymeleaf map dữ liệu.
public class UserRegisterDTO {
    private String username;
    
    private String fullName;
    
    private String email;
    
    private String password;
    
    private String confirmPassword; // Ô nhập lại mật khẩu dùng để so khớp lỗi logic
}