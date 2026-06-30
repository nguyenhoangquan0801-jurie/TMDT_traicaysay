package vn.edu.nlu.fit.nonglamfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.repository.QuestionRepository;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public void save(ProductQuestion question) {
        questionRepository.save(question);
    }

    /**
     * Logic gợi ý thông minh cho Autocomplete
     */
    public List<ProductQuestion> getSmartSuggestions(Long productId, String keyword) {
        // 1. Lấy danh sách 'POPULAR' khớp từ khóa
        List<ProductQuestion> popular = questionRepository.findByProductIdAndStatusAndContentContainingIgnoreCase(
                productId, "POPULAR", keyword);

        // 2. Lấy danh sách 'ANSWERED' khớp từ khóa
        List<ProductQuestion> answered = questionRepository.findByProductIdAndStatusAndContentContainingIgnoreCase(
                productId, "ANSWERED", keyword);

        // 3. Kết hợp và lọc dữ liệu (ưu tiên POPULAR lên trước)
        List<ProductQuestion> suggestions = new ArrayList<>(popular);
        suggestions.addAll(answered);

        return suggestions.stream()
                          .distinct()
                          .limit(5)
                          .collect(Collectors.toList());
    }

    /**
     * Dùng cho phần hiển thị 'Câu hỏi thường gặp' ở đầu tab Q&A
     */
    public List<ProductQuestion> findPopularQuestions(Long productId) {
        return questionRepository.findByProductIdAndStatusAndParentIsNull(productId, "POPULAR");
    }

    /**
     * Dùng cho phần 'Cộng đồng thảo luận' (hiển thị danh sách câu hỏi đã trả lời)
     */
    public List<ProductQuestion> findAnsweredQuestions(Long productId) {
        // Giả sử bạn muốn lấy các câu hỏi đã trả lời (không phải câu hỏi gốc của FAQ)
        return questionRepository.findByProductIdAndStatus(productId, "ANSWERED");
    }
}