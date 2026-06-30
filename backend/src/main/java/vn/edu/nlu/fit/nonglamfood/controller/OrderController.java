package vn.edu.nlu.fit.nonglamfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class OrderController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("====== NHẬN REQUEST ĐẶT HÀNG: " + payload + " ======");

            // Lấy thông tin cơ bản từ payload React gửi lên
            Object userIdObj = payload.get("userId");
            long userId = (userIdObj != null) ? Long.parseLong(userIdObj.toString()) : 1L;

            Object totalAmountObj = payload.get("totalAmount");
            double totalAmount = (totalAmountObj != null) ? Double.parseDouble(totalAmountObj.toString()) : 0.0;

            // Chèn dữ liệu vào bảng 'orders' và lấy ID 
            String insertOrderSql = "INSERT INTO orders (user_id, total_amount, order_date, status) VALUES (?, ?, NOW(), 0)";
            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(insertOrderSql, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, userId);
                ps.setDouble(2, totalAmount);
                return ps;
            }, keyHolder);

            long orderId = keyHolder.getKey().longValue();
            System.out.println("====== ĐÃ TẠO ĐƠN HÀNG THÀNH CÔNG! ID: " + orderId + " ======");

            // Duyệt mảng 'items' từ giỏ hàng gửi lên để lưu vào bảng 'order_details'
            if (payload.get("items") != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
                String insertDetailSql = "INSERT INTO order_details (order_id, product_id, name, image, quantity, price) VALUES (?, ?, ?, ?, ?, ?)";

                for (Map<String, Object> item : items) {
                    
                    Object productIdObj = item.get("id") != null ? item.get("id")
                            : (item.get("productId") != null ? item.get("productId") : item.get("product_id"));

                    Long productId = null;
                    if (productIdObj != null && !productIdObj.toString().equals("null")) {
                        productId = Long.parseLong(productIdObj.toString());
                    } else {                    
                        productId = 1L;
                    }

                    String name = item.get("name") != null ? item.get("name").toString() : "Sản phẩm sấy dẻo";
                    String image = item.get("image") != null ? item.get("image").toString() : null;

                    Object qtyObj = item.get("quantity") != null ? item.get("quantity")
                            : (item.get("qty") != null ? item.get("qty") : 1);
                    int quantity = Integer.parseInt(qtyObj.toString());

                    Object priceObj = item.get("price");
                    double price = (priceObj != null) ? Double.parseDouble(priceObj.toString()) : 0.0;

                    jdbcTemplate.update(insertDetailSql, orderId, productId, name, image, quantity, price);
                }
            }

            response.put("success", true);
            response.put("id", orderId);
            response.put("message", "Đặt hàng thành công!");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Lỗi xử lý lưu đơn hàng: " + e.getMessage());
            return ResponseEntity.ok(response); // Trả về mã 200 kèm báo lỗi để trình duyệt không bị treo (Pending)
        }
    }

    @SuppressWarnings("deprecation")
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        // Lấy toàn bộ danh sách đơn hàng
        String sqlOrders = "SELECT id, " +
                "id AS ma_don_hang, " +
                "user_id, " +
                "status, " +
                "total_amount AS tong_thanh_toan, " +
                "total_amount AS totalAmount, " +
                "DATE_FORMAT(order_date, '%d/%m/%Y %H:%i') AS ngay_dat, " +
                "DATE_FORMAT(order_date, '%d/%m/%Y %H:%i') AS orderDate " +
                "FROM orders ORDER BY id DESC";

        List<Map<String, Object>> orders = jdbcTemplate.queryForList(sqlOrders);

        String sqlDetails = "SELECT product_id AS productId, name, image, quantity, (price + 0) AS price FROM order_details WHERE order_id = ?";

        for (Map<String, Object> order : orders) {
            Long orderId = Long.parseLong(order.get("id").toString());

            // Lấy các sản phẩm thuộc về đơn hàng này
            List<Map<String, Object>> items = jdbcTemplate.queryForList(sqlDetails, orderId);

            order.put("items", items);
        }

        return ResponseEntity.ok(orders);
    }

    // API CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG 
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Lấy status mới từ React gửi lên 
            Object statusObj = body.get("status");
            if (statusObj == null) {
                response.put("success", false);
                response.put("message", "Trạng thái không hợp lệ!");
                return ResponseEntity.badRequest().body(response);
            }
            
            int newStatus = Integer.parseInt(statusObj.toString());

            // Chạy lệnh SQL cập nhật cột status dựa trên ID đơn hàng
            String updateSql = "UPDATE orders SET status = ? WHERE id = ?";
            int rowsAffected = jdbcTemplate.update(updateSql, newStatus, id);

            if (rowsAffected > 0) {
                response.put("success", true);
                response.put("message", "Cập nhật trạng thái đơn hàng thành công!");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Không tìm thấy đơn hàng mã #" + id);
                return ResponseEntity.status(404).body(response);
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Lỗi Backend: " + e.getMessage());
            return ResponseEntity.ok(response);
        }
    }
}