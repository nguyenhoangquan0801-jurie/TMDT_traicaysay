package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller; // Thêm import này
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import vn.edu.nlu.fit.nonglamfood.repository.ProductQuestionRepository;
import vn.edu.nlu.fit.nonglamfood.repository.ReviewRepository;
import vn.edu.nlu.fit.nonglamfood.service.ProductService;
import vn.edu.nlu.fit.nonglamfood.service.QuestionService;

import java.util.List;
@Controller // Đánh dấu đây là Controller điều hướng giao diện
public class ProductController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductQuestionRepository questionRepository;

    @GetMapping("/product/detail/{id}")
    public String getProductDetail(@PathVariable("id") Long id, Model model) {
        // ... Khối code lấy thông tin Product hiện tại của bạn ...
        // Ví dụ: Product product = productService.findById(id);
        // model.addAttribute("product", product);
        Product product = productService.getProductById(id);
        if (product == null) {
            return "redirect:/"; // Quay về trang chủ nếu không tìm thấy sản phẩm
        }
        model.addAttribute("product", product);
        // 1. Nạp danh sách Đánh giá
        model.addAttribute("reviews", reviewRepository.findByProductIdOrderByCreatedAtDesc(id));

        // 2. Nạp danh sách Câu hỏi phổ biến (status = 'POPULAR')
        List<ProductQuestion> popularQuestions = questionService.findPopularQuestions(id);
        model.addAttribute("popularQuestions", popularQuestions);
        // 3. Nạp danh sách Thắc mắc đã trả lời (status = 'ANSWERED') để hiển thị bên dưới
        model.addAttribute("answeredQuestions", questionRepository.findByProductIdAndStatusAndParentIsNullOrderByCreatedAtDesc(id, "ANSWERED"));
        
        return "product_details"; // Tên file HTML chi tiết sản phẩm của bạn nằm trong thư mục templates
    }
}