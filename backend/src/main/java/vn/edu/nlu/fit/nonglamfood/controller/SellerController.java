package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.nlu.fit.nonglamfood.dto.ProductDTO;
import vn.edu.nlu.fit.nonglamfood.dto.SellerInfoDTO;
import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.model.Seller;
import vn.edu.nlu.fit.nonglamfood.repository.ProductRepository;
import vn.edu.nlu.fit.nonglamfood.repository.SellerRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerController {

    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;

    public SellerController(SellerRepository sellerRepository, ProductRepository productRepository) {
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
    }

    private Seller getOrCreateDefaultSeller() {
        return sellerRepository.findByUserUsername("nonglam_seller")
                .or(() -> sellerRepository.findAll().stream().findFirst())
                .orElseThrow(() -> new RuntimeException("No seller found in the system"));
    }

    @GetMapping("/info")
    public ResponseEntity<SellerInfoDTO> getSellerInfo() {
        try {
            Seller seller = getOrCreateDefaultSeller();
            return ResponseEntity.ok(new SellerInfoDTO(seller));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getSellerProducts() {
        try {
            Seller seller = getOrCreateDefaultSeller();
            List<Product> products = productRepository.findBySellerId(seller.getId());
            List<ProductDTO> dtos = products.stream()
                    .map(ProductDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
