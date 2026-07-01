package vn.edu.nlu.fit.nonglamfood.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import vn.edu.nlu.fit.nonglamfood.entity.User;

@Entity
@Table(name = "sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    @Column(name = "`desc`", columnDefinition = "TEXT") // Quote desc since it's a SQL reserved keyword in some databases
    private String desc;

    @Column(name = "warning_count")
    private Integer warningCount = 0;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, BANNED

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Seller() {}

    public Seller(User user, String shopName, String desc, Integer warningCount, String status) {
        this.user = user;
        this.shopName = shopName;
        this.desc = desc;
        this.warningCount = warningCount;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Integer getWarningCount() {
        return warningCount;
    }

    public void setWarningCount(Integer warningCount) {
        this.warningCount = warningCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
