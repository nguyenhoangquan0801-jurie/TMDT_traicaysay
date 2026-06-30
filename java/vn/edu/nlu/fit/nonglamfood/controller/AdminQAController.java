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
        List<ProductQuestion> pendingQuestions = questionRepository.findByParentIsNullAndStatusOrderByCreatedAtDesc("PENDING");
        
        // Debug: Kiểm tra xem list có bị null không
        System.out.println("Số câu hỏi chờ duyệt: " + (pendingQuestions != null ? pendingQuestions.size() : "NULL"));
        
        model.addAttribute("pendingQuestions", pendingQuestions);
        return "admin/admin-qa";
    }

    // 2. Khi Admin bấm Lưu: Sửa câu hỏi + Thêm câu trả lời + Gỡ tag PENDING
    @PostMapping("/reply")
    public String replyQuestion(@RequestParam("questionId") Long questionId,
                            @RequestParam("productId") Long productId,
                            @RequestParam("editedContent") String editedContent,
                            @RequestParam("adminReply") String adminReply) {
    
    // Tìm câu hỏi cha
    ProductQuestion question = questionRepository.findById(questionId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid question Id: " + questionId));
    
    // Cập nhật câu hỏi gốc (chuẩn hóa nội dung)
    question.setContent(editedContent);
        question.setStatus("ANSWERED"); 
        questionRepository.save(question);

        // Tạo câu trả lời mới
        ProductQuestion reply = new ProductQuestion();
        reply.setProductId(productId);
        reply.setUserName("Nonglamfood - Quản trị viên");
        reply.setContent(adminReply);
        reply.setParent(question);
        reply.setStatus("ANSWERED");
        reply.setAdminReply(true);
        
        questionRepository.save(reply);

        // Dùng redirect chính xác đến URL của controller này
        return "redirect:/admin/qa?success";
    }
}