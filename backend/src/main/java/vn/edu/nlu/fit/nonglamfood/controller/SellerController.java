package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.nlu.fit.nonglamfood.dto.ProductDTO;
import vn.edu.nlu.fit.nonglamfood.dto.SellerInfoDTO;
import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.model.Seller;
import vn.edu.nlu.fit.nonglamfood.repository.ProductRepository;
import vn.edu.nlu.fit.nonglamfood.repository.SellerRepository;

import java.math.BigDecimal;
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

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        try {
            Seller seller = getOrCreateDefaultSeller();
            Product product = new Product();
            product.setSeller(seller);
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getCategory()); // Using category as description for now
            product.setPrice(BigDecimal.valueOf(productDTO.getPrice()));
            product.setStock(productDTO.getStock());
            
            Product savedProduct = productRepository.save(product);
            return ResponseEntity.ok(new ProductDTO(savedProduct));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            return productRepository.findById(id).map(product -> {
                product.setName(productDTO.getName());
                product.setPrice(BigDecimal.valueOf(productDTO.getPrice()));
                product.setStock(productDTO.getStock());
                Product savedProduct = productRepository.save(product);
                return ResponseEntity.ok(new ProductDTO(savedProduct));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            if (productRepository.existsById(id)) {
                productRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
