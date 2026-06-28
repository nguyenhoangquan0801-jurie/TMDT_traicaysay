package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.nlu.fit.nonglamfood.model.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Tìm kiếm bằng Email HOẶC Username
    Optional<User> findByEmailOrUsername(String email, String username);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}