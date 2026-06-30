package vn.edu.nlu.fit.nonglamfood.repository;

import vn.edu.nlu.fit.nonglamfood.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    // Lấy tất cả đánh giá của một sản phẩm, sắp xếp theo thời gian mới nhất trước
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
}