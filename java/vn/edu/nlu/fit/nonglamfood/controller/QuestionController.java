package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import vn.edu.nlu.fit.nonglamfood.service.QuestionService;

import java.util.List;

@Controller
@RequestMapping("/api/product/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    // 1. Xử lý khi người dùng nhấn "Gửi thắc mắc"
    @PostMapping
    public String submitQuestion(@RequestParam("productId") Long productId,
                                 @RequestParam("userName") String userName,
                                 @RequestParam("content") String content) {
        
        ProductQuestion question = new ProductQuestion();
        question.setProductId(productId);
        question.setUserName(userName);
        question.setContent(content);
        question.setStatus("PENDING"); // Trạng thái chờ duyệt
        
        questionService.save(question);
        
        // Điều hướng quay lại trang chi tiết sản phẩm
        return "redirect:/product/detail/" + productId + "?success";
    }

    // 2. Xử lý Autocomplete khi người dùng nhập câu hỏi
    @GetMapping("/autocomplete")
    @ResponseBody
    public List<ProductQuestion> getAutocomplete(@RequestParam Long productId, 
                                                @RequestParam String keyword) {
        // Trả về danh sách các câu hỏi đã được trả lời (để gợi ý)
        return questionService.findAnsweredQuestionsByKeyword(productId, keyword);
    }
}