package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.model.Role;
import vn.edu.nlu.fit.nonglamfood.model.Seller;
import vn.edu.nlu.fit.nonglamfood.model.User;
import vn.edu.nlu.fit.nonglamfood.repository.ProductRepository;
import vn.edu.nlu.fit.nonglamfood.repository.RoleRepository;
import vn.edu.nlu.fit.nonglamfood.repository.SellerRepository;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;

    public DatabaseSeeder(UserRepository userRepository,
                          RoleRepository roleRepository,
                          SellerRepository sellerRepository,
                          ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role userRole = new Role(1L, "USER");
            Role sellerRole = new Role(2L, "SELLER");
            Role adminRole = new Role(3L, "ADMIN");
            roleRepository.saveAll(Arrays.asList(userRole, sellerRole, adminRole));
        }

        if (userRepository.count() == 0) {
            Role sellerRole = roleRepository.findById(2L).orElseThrow();
            
            User user = new User("nonglam_seller", "seller@nonglam.com", "password123", false);
            user.setRoles(new HashSet<>(Arrays.asList(sellerRole)));
            userRepository.save(user);

            Seller seller = new Seller(user, "NongLam Food", "Kênh bán sỉ & lẻ trái cây sấy dẻo và hạt dinh dưỡng cao cấp tự nhiên.", 0, "ACTIVE");
            sellerRepository.save(seller);

            Product prod1 = new Product(seller, "Mít sấy dẻo thượng hạng 250g", "Mít sấy dẻo tự nhiên không đường bổ dưỡng.", BigDecimal.valueOf(90000), 15, null);
            Product prod2 = new Product(seller, "Xoài sấy dẻo đặc sản 500g", "Xoài chín tự nhiên sấy lạnh dẻo ngọt chua nhẹ.", BigDecimal.valueOf(140000), 0, null);
            Product prod3 = new Product(seller, "Hạt Macca nứt vỏ Đắk Lắk 500g", "Hạt macca giàu chất béo tốt và vitamin.", BigDecimal.valueOf(175000), 40, null);
            Product prod4 = new Product(seller, "Vỏ bưởi sấy vị chanh dây 150g", "Vỏ bưởi sấy dai giòn vị chanh dây thanh mát.", BigDecimal.valueOf(55000), 2, null);
            Product prod5 = new Product(seller, "Hạt điều rang muối vỏ lụa Bình Phước", "Hạt điều rang củi thơm bùi giòn rụm.", BigDecimal.valueOf(120000), 18, null);
            Product prod6 = new Product(seller, "Trà hoa cúc mật ong hảo hạng", "Trà thảo mộc hoa cúc sấy khô sấy lạnh mật ong ngọt dịu.", BigDecimal.valueOf(85000), 35, null);
            Product prod7 = new Product(seller, "Khoai lang sấy giòn đà lạt 200g", "Khoai lang mật Đà Lạt sấy giòn tan ngọt tự nhiên.", BigDecimal.valueOf(65000), 10, null);

            productRepository.saveAll(Arrays.asList(prod1, prod2, prod3, prod4, prod5, prod6, prod7));
        }
    }
}
