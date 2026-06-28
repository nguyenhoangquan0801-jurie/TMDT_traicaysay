package vn.edu.nlu.fit.nonglamfood.controller;

import vn.edu.nlu.fit.nonglamfood.repository.ProductQuestionRepository;
import vn.edu.nlu.fit.nonglamfood.model.ProductQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin/qa")
public class AdminQAController {

    @Autowired
    private ProductQuestionRepository questionRepository;

    // 1. Hiển thị trang danh sách câu hỏi chờ duyệt (status = 'PENDING')
    @GetMapping
    public String showPendingQuestions(Model model) {
        // Lấy danh sách câu hỏi gốc đang chờ duyệt
        List<ProductQuestion> pendingQuestions = questionRepository.findByParentIsNullAndStatusOrderByCreatedAtDesc("PENDING");
        
        model.addAttribute("pendingQuestions", pendingQuestions);
        return "admin/admin-qa"; // Đường dẫn tới file giao diện admin-qa.html
    }

    // 2. Khi Admin bấm Lưu: Sửa câu hỏi + Thêm câu trả lời + Gỡ tag PENDING
    @PostMapping("/reply")
    public String replyQuestion(@RequestParam("questionId") Long questionId,
                                @RequestParam("productId") Long productId,
                                @RequestParam("editedContent") String editedContent,
                                @RequestParam("adminReply") String adminReply) {
        
        // BƯỚC A: Tìm và cập nhật lại câu hỏi gốc của khách (Sửa lỗi chính tả nếu có)
        ProductQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy câu hỏi với ID: " + questionId));
        
        question.setContent(editedContent); // Ghi đè nội dung đã sửa chính tả
        question.setStatus("ANSWERED");    // Chuyển sang trạng thái Đã trả lời (Tự động gỡ tag PENDING)
        questionRepository.save(question);

        // BƯỚC B: Tạo bản ghi câu trả lời mới của Admin lồng vào câu hỏi cha
        ProductQuestion reply = new ProductQuestion();
        reply.setProductId(productId);
        reply.setUserName("Nonglamfood - Quản trị viên");
        reply.setContent(adminReply);
        reply.setParent(question);         // Chỉ định thuộc về câu hỏi cha nào
        reply.setStatus("ANSWERED");
        reply.setAdminReply(true);         // Xác nhận đây là Admin trả lời
        
        questionRepository.save(reply);

        // Quay lại trang quản lý câu hỏi sau khi lưu thành công
        return "redirect:/admin/questions";
    }
}