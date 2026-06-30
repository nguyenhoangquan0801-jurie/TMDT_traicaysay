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

    // 1. Gửi thắc mắc mới (Giữ nguyên)
    @PostMapping
    public String submitQuestion(@RequestParam Long productId, @RequestParam String userName, @RequestParam String content) {
        ProductQuestion question = new ProductQuestion();
        question.setProductId(productId);
        question.setUserName(userName);
        question.setContent(content);
        question.setStatus("PENDING"); 
        questionService.save(question);
        return "redirect:/product/detail/" + productId + "?success";
    }

    // 2. Autocomplete thông minh với 3 trường hợp
    @GetMapping("/autocomplete")
    @ResponseBody
    public List<ProductQuestion> getAutocomplete(@RequestParam Long productId, @RequestParam String keyword) {
        // Gọi service lấy danh sách theo ưu tiên:
        // 1. Phổ biến (POPULAR)
        // 2. Đã trả lời (ANSWERED)
        // 3. (Nếu không có) Trả về list rỗng để thông báo chưa có thông tin
        return questionService.getSmartSuggestions(productId, keyword);
    }
}