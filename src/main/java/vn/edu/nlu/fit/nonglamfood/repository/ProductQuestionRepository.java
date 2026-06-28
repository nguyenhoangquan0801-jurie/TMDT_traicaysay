package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; //  Đúng chuẩn Spring Data JPA
import org.springframework.stereotype.Repository;
import java.util.List;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;

@Repository
public interface ProductQuestionRepository extends JpaRepository<ProductQuestion, Long> {

    // 1. Lấy danh sách câu hỏi phổ biến gợi ý sẵn (status = 'POPULAR')
    List<ProductQuestion> findByProductIdAndStatusAndParentIsNull(Long productId, String status);

    // 2. Lấy câu hỏi hiển thị công khai cho khách xem (Có parent là NULL và đã trả lời 'ANSWERED')
    List<ProductQuestion> findByProductIdAndStatusAndParentIsNullOrderByCreatedAtDesc(Long productId, String status);

    // 3. Tính năng gợi ý câu hỏi tương tự khi khách đang gõ (Autocomplete)
    // Tìm kiếm các câu hỏi gốc (parent_id IS NULL) chứa từ khóa mà khách gõ
    @Query("SELECT pq FROM ProductQuestion pq WHERE pq.productId = :productId " +
           "AND pq.parent IS NULL " +
           "AND LOWER(pq.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProductQuestion> searchSimilarQuestions(@Param("productId") Long productId, @Param("keyword") String keyword);

    // 4. Trang Admin hiển thị câu hỏi (Giống Shopee): Lấy câu hỏi gốc đang chờ duyệt (status = 'PENDING')
    List<ProductQuestion> findByParentIsNullAndStatusOrderByCreatedAtDesc(String status);
}