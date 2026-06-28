package vn.edu.nlu.fit.nonglamfood.model;

import jakarta.persistence.*; // Nhập tất cả các Annotation tiêu chuẩn của JPA để làm việc với Database
import lombok.Data; // Nhập thư viện Lombok để tự động sinh code bổ trợ

@Entity 
// Ý NGHĨA: Khai báo với Spring Data JPA rằng lớp này là một "Thực thể" (Entity), nó sẽ đại diện cho 1 bảng dưới Database.

@Table(name = "users") 
// Ý NGHĨA: Chỉ định chính xác tên bảng dưới Database sẽ là "users". Nếu không có annotation này, JPA sẽ tự lấy tên class (User) làm tên bảng.

@Data 
// Ý NGHĨA: Của thư viện Lombok. Nó tự động sinh ra toàn bộ hàm Getter, Setter, toString(), equals() và hashCode() khi dự án được biên dịch. Giúp file code nhìn cực kỳ sạch sẽ, không bị rác.
public class User {

    @Id 
    // Ý NGHĨA: Đánh dấu thuộc tính ngay phía dưới (id) chính là Khóa Chính (Primary Key) của bảng này.
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    // Ý NGHĨA: Cấu hình cho Khóa Chính tự động tăng (Auto-increment) do Database quản lý (Cực kỳ phù hợp với MySQL, H2, PostgreSQL).
    private Long id;

    @Column(nullable = false, unique = true, length = 50) 
    // Ý NGHĨA: Định nghĩa thuộc tính dưới DB: Không được để trống (NOT NULL), giá trị không được trùng lặp (UNIQUE) và độ dài tối đa là 50 ký tự.
    private String email; 

    // 💡 CẬP NHẬT MỚI: Thuộc tính Tên đăng nhập (Username) giúp hỗ trợ đăng nhập song song với Email.
    @Column(nullable = false, unique = true, length = 50)
    // Ý NGHĨA: Bắt buộc NOT NULL để tài khoản LOCAL luôn có định danh ngắn gọn, UNIQUE để không bị trùng tên đăng nhập giữa các thành viên.
    private String username;

    @Column(nullable = true) 
    // Ý NGHĨA: Cho phép cột này được phép trống (NULL). Bạn giải thích rất đúng: User đăng nhập bằng Google thì không cần lưu mật khẩu cục bộ.
    private String password; 

    @Column(name = "full_name", nullable = false, length = 100) 
    // Ý NGHĨA: Khớp thuộc tính "fullName" (viết kiểu Lạc Đà trong Java) với tên cột "full_name" (viết kiểu dấu gạch dưới trong DB). Đồng thời bắt buộc NOT NULL, tối đa 100 ký tự.
    private String fullName;

    @Enumerated(EnumType.STRING) 
    // Ý NGHĨA: Bắt buộc JPA phải lưu giá trị của Enum dưới dạng CHỮ (Chuỗi text "LOCAL" hoặc "GOOGLE") vào Database, thay vì lưu dạng số INDEX (0, 1). Điều này giúp DB dễ đọc và không bị lệch dữ liệu nếu sau này bạn thêm Enum mới vào giữa.
    @Column(nullable = false)
    private Provider provider; 

    @Column(nullable = false) 
    // Ý NGHĨA: Cột lưu vai trò người dùng, bắt buộc NOT NULL. 
    // Mẹo: Nên lưu sẵn chuỗi có chữ "ROLE_" (Ví dụ: "ROLE_USER") để Spring Security nhận diện phân quyền chính xác tuyệt đối.
    private String role; 

}