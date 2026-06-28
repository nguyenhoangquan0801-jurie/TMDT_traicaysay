package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller; // Thêm import này
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import vn.edu.nlu.fit.nonglamfood.repository.ProductQuestionRepository;
import vn.edu.nlu.fit.nonglamfood.repository.ReviewRepository;

@Controller // Đánh dấu đây là Controller điều hướng giao diện
public class ProductController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductQuestionRepository questionRepository;

    @GetMapping("/product/{id}")
    public String getProductDetail(@PathVariable("id") Long id, Model model) {
        // ... Khối code lấy thông tin Product hiện tại của bạn ...
        // Ví dụ: Product product = productService.findById(id);
        // model.addAttribute("product", product);

        // 1. Nạp danh sách Đánh giá
        model.addAttribute("reviews", reviewRepository.findByProductIdOrderByCreatedAtDesc(id));

        // 2. Nạp danh sách Câu hỏi phổ biến (status = 'POPULAR')
        model.addAttribute("popularQuestions", questionRepository.findByProductIdAndStatusAndParentIsNull(id, "POPULAR"));

        // 3. Nạp danh sách Thắc mắc đã trả lời (status = 'ANSWERED') để hiển thị bên dưới
        model.addAttribute("answeredQuestions", questionRepository.findByProductIdAndStatusAndParentIsNullOrderByCreatedAtDesc(id, "ANSWERED"));

        return "product-detail"; // Tên file HTML chi tiết sản phẩm của bạn nằm trong thư mục templates
    }
}