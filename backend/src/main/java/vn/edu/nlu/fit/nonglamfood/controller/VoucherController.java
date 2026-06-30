package vn.edu.nlu.fit.nonglamfood.controller;

import vn.edu.nlu.fit.nonglamfood.entity.Voucher;
import vn.edu.nlu.fit.nonglamfood.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/vouchers")
@CrossOrigin(origins = "http://localhost:3000") 
public class VoucherController {

    @Autowired
    private VoucherRepository voucherRepository;

    @GetMapping("/check")
    public ResponseEntity<?> checkVoucher(@RequestParam String code) {
        // Tìm mã voucher 
        Optional<Voucher> voucherOpt = voucherRepository.findByCodeAndActiveTrue(code);

        // Nếu không tìm thấy mã hoặc mã đã bị ẩn 
        if (voucherOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa!\"}");
        }

        Voucher voucher = voucherOpt.get();

        // Kiểm tra xem voucher đã hết hạn sử dụng chưa
        if (voucher.getExpiryDate() != null && voucher.getExpiryDate().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("{\"message\": \"Mã giảm giá này đã hết hạn sử dụng!\"}");
        }

        // Kiểm tra xem số lượng mã còn lại để dùng hay không
        if (voucher.getQuantity() != null && voucher.getQuantity() <= 0) {
            return ResponseEntity.badRequest().body("{\"message\": \"Mã giảm giá đã hết lượt sử dụng!\"}");
        }

        return ResponseEntity.ok(voucher);
    }
}
