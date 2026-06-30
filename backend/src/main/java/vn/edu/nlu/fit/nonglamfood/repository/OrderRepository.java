package vn.edu.nlu.fit.nonglamfood.repository;

import vn.edu.nlu.fit.nonglamfood.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
