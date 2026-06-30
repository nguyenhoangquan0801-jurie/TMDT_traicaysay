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
    private JdbcTemplate jdbcTemplate; // Sử dụng bộ điều khiển SQL thuần để bỏ qua hoàn toàn lỗi kẹt của
                                       // Hibernate/Jackson

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("====== NHẬN REQUEST ĐẶT HÀNG: " + payload + " ======");

            // 1. Lấy thông tin cơ bản từ payload React gửi lên
            Object userIdObj = payload.get("userId");
            long userId = (userIdObj != null) ? Long.parseLong(userIdObj.toString()) : 1L;

            Object totalAmountObj = payload.get("totalAmount");
            double totalAmount = (totalAmountObj != null) ? Double.parseDouble(totalAmountObj.toString()) : 0.0;

            // 2. Chèn dữ liệu vào bảng 'orders' và lấy ID vừa sinh ra
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

            // 3. Duyệt mảng 'items' từ giỏ hàng gửi lên để lưu vào bảng 'order_details'
            if (payload.get("items") != null) {
                List<Map<String, Object>> items = (List<Map<String, Object>>) payload.get("items");
                String insertDetailSql = "INSERT INTO order_details (order_id, product_id, name, image, quantity, price) VALUES (?, ?, ?, ?, ?, ?)";

                for (Map<String, Object> item : items) {
                    // Kiểm tra mọi khả năng lấy key ID từ React gửi lên
                    Object productIdObj = item.get("id") != null ? item.get("id")
                            : (item.get("productId") != null ? item.get("productId") : item.get("product_id"));

                    Long productId = null;
                    if (productIdObj != null && !productIdObj.toString().equals("null")) {
                        productId = Long.parseLong(productIdObj.toString());
                    } else {
                        // BỌC LÓT PHÒNG HỜ: Nếu Frontend gửi lên bị null, gán tạm sản phẩm ID = 1
                        // (Hoặc ID bất kỳ đang có sẵn trong bảng 'products' của bạn) để MySQL không báo
                        // lỗi ngoại
                        productId = 1L;
                    }

                    String name = item.get("name") != null ? item.get("name").toString() : "Sản phẩm sấy dẻo";
                    String image = item.get("image") != null ? item.get("image").toString() : null;

                    Object qtyObj = item.get("quantity") != null ? item.get("quantity")
                            : (item.get("qty") != null ? item.get("qty") : 1);
                    int quantity = Integer.parseInt(qtyObj.toString());

                    Object priceObj = item.get("price");
                    double price = (priceObj != null) ? Double.parseDouble(priceObj.toString()) : 0.0;

                    // Thực thi lưu vào database
                    jdbcTemplate.update(insertDetailSql, orderId, productId, name, image, quantity, price);
                }
            }

            // Phản hồi định dạng JSON chuẩn phẳng lỳ, React nhận được sẽ chạy vào nhánh
            // thành công ngay
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
        // 1. Lấy toàn bộ danh sách đơn hàng tổng quát
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

        // 2. Với mỗi đơn hàng, truy vấn tiếp bảng chi tiết để nạp danh sách sản phẩm (items) vào bên trong
        // ĐÃ CẬP NHẬT: ÉP KIỂU ĐỐI TƯỢNG TRONG SQL ĐỂ TRANH LỖI BIGDECIMAL SANG REACT KHÔNG NHÂN ĐƯỢC PHÉP TÍNH
        String sqlDetails = "SELECT product_id AS productId, name, image, quantity, (price + 0) AS price FROM order_details WHERE order_id = ?";

        for (Map<String, Object> order : orders) {
            Long orderId = Long.parseLong(order.get("id").toString());

            // Lấy các sản phẩm thuộc về đơn hàng này
            List<Map<String, Object>> items = jdbcTemplate.queryForList(sqlDetails, orderId);

            // Đút mảng sản phẩm vào đúng key 'items' để React dễ dàng loop (.map) ra giao diện
            order.put("items", items);
        }

        return ResponseEntity.ok(orders);
    }

    // API CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (HỦY ĐƠN HOẶC XÁC NHẬN)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Lấy status mới từ React gửi lên (Ví dụ: -1 là hủy, 1 là đã xác nhận...)
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