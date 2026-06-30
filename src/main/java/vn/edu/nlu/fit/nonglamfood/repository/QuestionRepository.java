package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<ProductQuestion, Long> {

    // 1. Dùng cho tính năng Gợi ý thông minh (Autocomplete)
    List<ProductQuestion> findByProductIdAndStatusAndContentContainingIgnoreCase(
            Long productId, String status, String content);
    
    // 2. Dùng cho phần 'Câu hỏi thường gặp' (POPULAR)
    // Lấy các câu hỏi gốc (ParentIsNull) có status là POPULAR
    List<ProductQuestion> findByProductIdAndStatusAndParentIsNull(Long productId, String status);

    // 3. Dùng cho phần 'Cộng đồng thảo luận' (ANSWERED)
    // Lấy tất cả các câu hỏi đã được trả lời (không cần kiểm tra ParentIsNull 
    // nếu bạn muốn hiển thị cả câu trả lời hoặc chỉ lấy câu hỏi gốc đã xong)
    List<ProductQuestion> findByProductIdAndStatus(Long productId, String status);
}