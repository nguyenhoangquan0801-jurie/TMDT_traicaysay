package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<ProductQuestion, Long> {
    // Phương thức này Spring Data JPA sẽ tự sinh code SQL cho bạn
    List<ProductQuestion> findByProductIdAndStatusAndContentContainingIgnoreCase(
            Long productId, String status, String content);
    
    // Thêm phương thức này để lấy câu hỏi cha cho mục Q&A ở trang chi tiết
    List<ProductQuestion> findByProductIdAndParentIsNullAndStatus(Long productId, String status);

    List<ProductQuestion> findByProductIdAndStatusAndParentIsNull(Long productId, String status);
}