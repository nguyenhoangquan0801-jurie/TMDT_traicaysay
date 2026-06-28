package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import vn.edu.nlu.fit.nonglamfood.repository.ReviewRepository;
import vn.edu.nlu.fit.nonglamfood.model.Review;
import vn.edu.nlu.fit.nonglamfood.repository.ProductQuestionRepository;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;

@Controller
@RequestMapping("/api/product")
public class ProductInteractionController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductQuestionRepository questionRepository;

    // 1. Tiếp nhận Đánh giá từ khách (Trả về JSON để hiển thị lời cảm ơn ẩn sau 3s)
    @PostMapping("/review")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addReview(@RequestParam("productId") Long productId,
                                                         @RequestParam("userName") String userName,
                                                         @RequestParam("ratingStars") int ratingStars,
                                                         @RequestParam("content") String content) {
        Review review = new Review();
        review.setProductId(productId);
        review.setUserName(userName);
        review.setRatingStars(ratingStars);
        review.setContent(content);
        reviewRepository.save(review);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Cảm ơn bạn đã đánh giá sản phẩm!");
        return ResponseEntity.ok(response);
    }

    // 2. Tiếp nhận Câu hỏi mới (Gắn tag mặc định là 'PENDING' chờ duyệt)
    @PostMapping("/question")
    public String addQuestion(@RequestParam("productId") Long productId,
                              @RequestParam("userName") String userName,
                              @RequestParam("content") String content) {
        ProductQuestion question = new ProductQuestion();
        question.setProductId(productId);
        question.setUserName(userName);
        question.setContent(content);
        question.setStatus("PENDING"); // Tag chờ trả lời
        question.setAdminReply(false);
        
        questionRepository.save(question);
        
        // Quay lại trang chi tiết sản phẩm sau khi gửi câu hỏi xong
        return "redirect:/product/" + productId;
    }

    // 3. API gợi ý câu hỏi tương tự khi khách đang gõ (Autocomplete)
    @GetMapping("/question/autocomplete")
    @ResponseBody
    public ResponseEntity<List<ProductQuestion>> autocompleteQuestions(@RequestParam("productId") Long productId,
                                                                       @RequestParam("keyword") String keyword) {
        if (keyword == null || keyword.trim().length() < 2) {
            return ResponseEntity.ok(List.of()); // Gõ dưới 2 ký tự thì chưa gợi ý
        }
        List<ProductQuestion> suggestions = questionRepository.searchSimilarQuestions(productId, keyword.trim());
        return ResponseEntity.ok(suggestions);
    }
}
