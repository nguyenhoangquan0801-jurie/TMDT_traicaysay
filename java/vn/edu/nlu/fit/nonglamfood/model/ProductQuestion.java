package vn.edu.nlu.fit.nonglamfood.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_questions", indexes = {
    @Index(name = "idx_product_id", columnList = "product_id"),
    @Index(name = "idx_parent_id", columnList = "parent_id")
})
public class ProductQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "user_name", nullable = false, length = 100)
    private String userName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // Thiết lập tự tham chiếu: Nhiều câu trả lời thuộc về 1 câu hỏi cha (parent)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private ProductQuestion parent;

    // 1 câu hỏi cha có thể có nhiều câu trả lời (replies)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductQuestion> replies = new ArrayList<>();

    @Column(length = 20)
    private String status = "PENDING"; // PENDING, ANSWERED, POPULAR

    @Column(name = "is_admin_reply")
    private boolean isAdminReply = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // --- Getter và Setter ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public ProductQuestion getParent() { return parent; }
    public void setParent(ProductQuestion parent) { this.parent = parent; }

    public List<ProductQuestion> getReplies() { return replies; }
    public void setReplies(List<ProductQuestion> replies) { this.replies = replies; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isAdminReply() { return isAdminReply; }
    public void setAdminReply(boolean adminReply) { this.isAdminReply = adminReply; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    // Thêm vào class ProductQuestion
    public void addReply(ProductQuestion reply) {
    replies.add(reply);
    reply.setParent(this);
}
}
