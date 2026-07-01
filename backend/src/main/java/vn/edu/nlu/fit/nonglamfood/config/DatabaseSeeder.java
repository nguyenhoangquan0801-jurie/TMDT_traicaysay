package vn.edu.nlu.fit.nonglamfood.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.entity.Role;
import vn.edu.nlu.fit.nonglamfood.model.Seller;
import vn.edu.nlu.fit.nonglamfood.entity.User;

import vn.edu.nlu.fit.nonglamfood.repository.ProductRepository;
import vn.edu.nlu.fit.nonglamfood.repository.RoleRepository;
import vn.edu.nlu.fit.nonglamfood.repository.SellerRepository;
import vn.edu.nlu.fit.nonglamfood.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Arrays;


@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;


    public DatabaseSeeder(
            UserRepository userRepository,
            RoleRepository roleRepository,
            SellerRepository sellerRepository,
            ProductRepository productRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
    }


    @Override
    @Transactional
    public void run(String... args) throws Exception {


        // ===== ROLE =====
        if (roleRepository.count() == 0) {

            Role userRole = new Role(1, "USER", null);


            Role sellerRole = new Role(2, "SELLER", null);


            Role adminRole = new Role(3, "ADMIN", null);


            roleRepository.saveAll(
                    Arrays.asList(
                            userRole,
                            sellerRole,
                            adminRole
                    )
            );
        }



        // ===== USER + SELLER =====
        if (userRepository.count() == 0) {


            Role sellerRole =
                    roleRepository.findById(2)
                            .orElseThrow();


            User user = User.builder()
        .fullName("nonglam_seller")
        .email("seller@nonglam.com")
        .passwordHash("password123")
        .isActive(true)
        .role(sellerRole)
        .build();

userRepository.save(user);



            Seller seller = new Seller(
        user,
        "NongLam Food",
        "Kênh bán sỉ & lẻ trái cây sấy dẻo và hạt dinh dưỡng cao cấp tự nhiên.",
        0,
        "ACTIVE"
);

sellerRepository.save(seller);


            sellerRepository.save(seller);



            Product prod1 = new Product(
                    seller,
                    "Mít sấy dẻo thượng hạng 250g",
                    "Mít sấy dẻo tự nhiên không đường bổ dưỡng.",
                    BigDecimal.valueOf(90000),
                    15,
                    null
            );


            Product prod2 = new Product(
                    seller,
                    "Xoài sấy dẻo đặc sản 500g",
                    "Xoài chín tự nhiên sấy lạnh dẻo ngọt.",
                    BigDecimal.valueOf(140000),
                    0,
                    null
            );


            Product prod3 = new Product(
                    seller,
                    "Hạt Macca nứt vỏ Đắk Lắk 500g",
                    "Hạt macca giàu chất béo tốt.",
                    BigDecimal.valueOf(175000),
                    40,
                    null
            );


            productRepository.saveAll(
                    Arrays.asList(
                            prod1,
                            prod2,
                            prod3
                    )
            );
        }
    }
}