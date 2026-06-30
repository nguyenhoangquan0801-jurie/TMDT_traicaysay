package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.nlu.fit.nonglamfood.dto.ProductDTO;
import vn.edu.nlu.fit.nonglamfood.dto.SellerInfoDTO;
import vn.edu.nlu.fit.nonglamfood.model.Product;
import vn.edu.nlu.fit.nonglamfood.model.Seller;
import vn.edu.nlu.fit.nonglamfood.repository.ProductRepository;
import vn.edu.nlu.fit.nonglamfood.repository.SellerRepository;
import vn.edu.nlu.fit.nonglamfood.repository.OrderRepository;
import vn.edu.nlu.fit.nonglamfood.model.Order;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(origins = "http://localhost:3000")
public class SellerController {

    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public SellerController(SellerRepository sellerRepository, ProductRepository productRepository,
            OrderRepository orderRepository) {
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    private Seller getSellerForUser(String username) {
        return sellerRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("No shop found for user: " + username));
    }

    @GetMapping("/info")
    public ResponseEntity<SellerInfoDTO> getSellerInfo(@RequestParam String username) {
        try {
            Seller seller = getSellerForUser(username);
            SellerInfoDTO dto = new SellerInfoDTO(seller);
            dto.setUsername(seller.getUser().getUsername());
            dto.setEmail(seller.getUser().getEmail());
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/settings")
    public ResponseEntity<SellerInfoDTO> updateSellerSettings(@RequestParam String username, @RequestBody SellerInfoDTO settingsDTO) {
        try {
            Seller seller = getSellerForUser(username);
            seller.setShopName(settingsDTO.getShopName());
            seller.setDesc(settingsDTO.getDesc());
            seller.setStatus(settingsDTO.getStatus());

            // Update email in the associated User model
            seller.getUser().setEmail(settingsDTO.getEmail());

            Seller savedSeller = sellerRepository.save(seller);
            return ResponseEntity.ok(new SellerInfoDTO(savedSeller));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/dashboard/kpi")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getDashboardKPI() {
        return ResponseEntity.ok(new HashMap<>());
    }

    @GetMapping("/dashboard/todo")
    public ResponseEntity<List<Map<String, Object>>> getDashboardTodo() {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/dashboard/chart")
    public ResponseEntity<List<Map<String, Object>>> getDashboardChart(
            @RequestParam(defaultValue = "week") String range) {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/orders/recent")
    public ResponseEntity<List<Map<String, Object>>> getRecentOrders() {
        return ResponseEntity.ok(new ArrayList<>());
    }

    @GetMapping("/products/low-stock")
    public ResponseEntity<List<Map<String, Object>>> getLowStockAlerts(@RequestParam String username) {
        try {
            Seller seller = getSellerForUser(username);
            List<Product> lowStockProducts = productRepository.findBySellerId(seller.getId())
                    .stream()
                    .filter(p -> p.getStock() <= 5)
                    .collect(Collectors.toList());

            List<Map<String, Object>> alerts = lowStockProducts.stream().map(p -> {
                Map<String, Object> m = new HashMap<>();
                m.put("name", p.getName());
                m.put("stock", p.getStock());
                m.put("status", p.getStock() == 0 ? "Hết hàng" : "Sắp hết hàng");
                m.put("badgeClass", p.getStock() == 0
                        ? "bg-rose-50 text-rose-700 border-rose-100"
                        : "bg-amber-50 text-amber-700 border-amber-100");
                return m;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getSellerProducts(@RequestParam String username) {
        try {
            Seller seller = getSellerForUser(username);
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
    public ResponseEntity<ProductDTO> addProduct(@RequestParam String username, @RequestBody ProductDTO productDTO) {
        try {
            Seller seller = getSellerForUser(username);
            Product product = new Product();
            product.setSeller(seller);
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getCategory());
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

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders(@RequestParam String username) {
        try {
            Seller seller = getSellerForUser(username);
            // In a real multi-vendor setup, orders would be filtered by seller_id in order_details
            // For now, we'll return orders that contain at least one product from this seller
            List<Order> orders = orderRepository.findAll().stream()
                    .filter(order -> order.getOrderDetails().stream()
                            .anyMatch(detail -> {
                                // Find product to check seller_id
                                return productRepository.findById(detail.getProductId())
                                        .map(p -> p.getSeller().getId().equals(seller.getId()))
                                        .orElse(false);
                            }))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam Integer status) {
        try {
            return orderRepository.findById(id).map(order -> {
                order.setStatus(status);
                return ResponseEntity.ok(orderRepository.save(order));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
