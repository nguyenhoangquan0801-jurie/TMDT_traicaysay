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

}
