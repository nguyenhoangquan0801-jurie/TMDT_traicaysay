package vn.edu.nlu.fit.nonglamfood.repository;

import vn.edu.nlu.fit.nonglamfood.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByRoleName(String roleName);

}