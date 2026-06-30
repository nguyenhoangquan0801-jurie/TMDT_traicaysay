package vn.edu.nlu.fit.nonglamfood.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.nlu.fit.nonglamfood.repository.QuestionRepository; // IMPORT CÁI NÀY
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;        // IMPORT CÁI NÀY
import java.util.List;
@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public void save(ProductQuestion question) {
        questionRepository.save(question);
    }

    public List<ProductQuestion> findAnsweredQuestionsByKeyword(Long productId, String keyword) {
        // Tìm những câu hỏi có status là 'ANSWERED' và nội dung chứa từ khóa
        return questionRepository.findByProductIdAndStatusAndContentContainingIgnoreCase(
                productId, "ANSWERED", keyword);
    }
    public List<ProductQuestion> findPopularQuestions(Long productId) {
        // Gọi đúng phương thức trong Repository
        return questionRepository.findByProductIdAndStatusAndParentIsNull(productId, "POPULAR");
    }
}