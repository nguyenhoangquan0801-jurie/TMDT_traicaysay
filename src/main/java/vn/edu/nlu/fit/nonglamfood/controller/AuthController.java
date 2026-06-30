package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired; // Thêm import để tự động tiêm UserService
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken; // LỆNH MẶC ĐỊNH: Xử lý Token khi đăng nhập bằng Google
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute; // Thêm import để map DTO từ Form HTML
import org.springframework.web.bind.annotation.PostMapping; // Thêm import để đón nhận phương thức POST (Submit Form)
import vn.edu.nlu.fit.nonglamfood.dto.UserRegisterDTO; // Thêm import lớp hứng dữ liệu đăng ký
import vn.edu.nlu.fit.nonglamfood.service.ProductService;
import vn.edu.nlu.fit.nonglamfood.service.UserService; // Thêm import lớp nghiệp vụ xử lý đăng ký
import java.security.Principal;

@Controller // Đánh dấu lớp này là một Controller để Spring Boot tiếp nhận các yêu cầu (request) từ trình duyệt
public class AuthController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService; 
    // LỆNH MỚI: Tiêm lớp dịch vụ xử lý logic đăng ký tài khoản vào đây để sử dụng

    // 1. Điều hướng người dùng vào trang chủ (index.html) khi truy cập đường dẫn "/"
    @GetMapping("/")
    public String homePage(Model model, Principal principal) {
        
        // KIỂM TRA: Nếu đối tượng principal khác null, nghĩa là người dùng ĐÃ đăng nhập thành công
        if (principal != null) {
            
            // LỆNH MẶC ĐỊNH: Lấy tên định danh (thường là Email/Username) đối với kiểu đăng nhập tài khoản thường
            String email = principal.getName(); 

            // KIỂM TRA ĐẶC BIỆT: Nếu người dùng đăng nhập bằng tài khoản GOOGLE (OAuth2)
            if (principal instanceof OAuth2AuthenticationToken oAuth2Token) {
                
                // Bước A: Lấy ra danh sách tất cả các thông tin (Attributes) mà Google trả về (ví dụ: name, email, picture,...)
                var attributes = oAuth2Token.getPrincipal().getAttributes();
                
                // Bước B: Trích xuất chính xác giá trị nằm trong thẻ "email" của Google và ép nó về kiểu chữ (String)
                email = (String) attributes.get("email");
            }

            // Đưa dữ liệu email thực tế thu được (Của cả Google lẫn Thường) ra giao diện thông qua biến "userEmail"
            model.addAttribute("userEmail", email);

            // ================== LỆNH BỔ SUNG ĐỂ SỬA LỖI MENU Q&A ==================
            var user = userService.findByEmail(email); 
            if (user != null) {
                // Cắt bỏ chữ "ROLE_" để giao diện HTML dùng biến 'userRole' gọn gàng
                String cleanRole = user.getRole().replace("ROLE_", ""); 
                model.addAttribute("userRole", cleanRole); 
            }   
            // ======================================================================
        }
        // 2. Xử lý Sản phẩm (MỚI)
        // Lấy toàn bộ sản phẩm từ Database
        var allProducts = productService.getAllProducts();
        
        // Lọc danh sách theo Category để truyền đúng vào các section
        model.addAttribute("newProducts", allProducts.stream()
                .filter(p -> "Mới".equals(p.getCategory())).toList());
                
        model.addAttribute("fruitProducts", allProducts.stream()
                .filter(p -> "Trái cây sấy".equals(p.getCategory())).toList());
            
        // Trả về giao diện có tên là "index" (Spring Boot tự tìm file src/main/resources/templates/index.html)
        return "index"; 
    }

    // 2. Điều hướng người dùng vào trang Đăng nhập khi họ truy cập đường dẫn "/login"
    @GetMapping("/login")
    public String loginPage(Principal principal) {
        
        // MẸO BẢO MẬT: Nếu người dùng ĐÃ đăng nhập rồi (principal không phải null) 
        if (principal != null) {
            
            // Lập tức điều hướng (đá) họ quay trở về trang chủ ngay, không cho phép họ nằm lại ở trang đăng nhập nữa
            return "redirect:/";
        }
        
        // Nếu họ chưa đăng nhập, cho phép mở giao diện trang đăng nhập (file src/main/resources/templates/login.html)
        return "login"; 
    }

    // 3. LỆNH MỚI (HÀM A): Trả về giao diện hiển thị trang đăng ký khi người dùng gõ URL "/register"
    @GetMapping("/register")
    public String registerPage(Model model, Principal principal) {
        
        // MẸO BẢO MẬT: Tương tự login, nếu họ đã đăng nhập rồi thì không cho phép đăng ký tài khoản mới nữa, đá về trang chủ
        if (principal != null) {
            return "redirect:/";
        }
        
        // Gửi một đối tượng DTO rỗng lên giao diện để form HTML Thymeleaf có cấu trúc map dữ liệu người dùng điền vào
        model.addAttribute("userDto", new UserRegisterDTO());
        
        // Trả về giao diện trang đăng ký (file src/main/resources/templates/register.html)
        return "register";
    }

    // 4. LỆNH MỚI (HÀM B): Tiếp nhận và xử lý gói dữ liệu DTO từ Form HTML đẩy lên khi người dùng nhấn nút "Đăng ký"
    @PostMapping("/register")
    public String handleRegister(@ModelAttribute("userDto") UserRegisterDTO userDto, Model model) {
        try {
            // Gọi tầng Service kiểm tra trùng email, trùng mật khẩu và tiến hành băm password lưu xuống database
            userService.registerNewUser(userDto);
            
            // Nếu không có lỗi gì xảy ra -> Điều hướng (Redirect) về trang đăng nhập kèm tham số báo hiệu đăng ký thành công "?success"
            return "redirect:/login?success";
        } catch (Exception e) {
            // Nếu tầng Service ném ra lỗi (Ví dụ: trùng email, lệch mật khẩu): 
            // Giữ chân người dùng lại trang đăng ký và gửi thông báo lỗi cụ thể ra màn hình hiển thị
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }
}