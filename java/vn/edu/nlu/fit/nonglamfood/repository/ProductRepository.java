package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.nlu.fit.nonglamfood.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Có thể thêm hàm tìm kiếm theo danh mục nếu cần
}