package vn.edu.nlu.fit.nonglamfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.nlu.fit.nonglamfood.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
