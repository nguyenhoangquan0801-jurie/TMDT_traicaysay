package vn.edu.nlu.fit.nonglamfood.dto;

import vn.edu.nlu.fit.nonglamfood.model.Seller;

public class SellerInfoDTO {
    private String shopName;
    private String username;
    private String email;
    private String desc;
    private String status;
    private String role;
    private Integer notifications;

    public SellerInfoDTO() {}

    public SellerInfoDTO(Seller seller) {
        this.shopName = seller.getShopName();
        this.username = seller.getUser().getUsername();
        this.email = seller.getUser().getEmail();
        this.desc = seller.getDesc();
        this.status = seller.getStatus();
        this.role = "Shop Đối Tác";
        this.notifications = 3;
    }

    // Getters and Setters
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDesc() { return desc; }
    public void setDesc(String desc) { this.desc = desc; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Integer getNotifications() { return notifications; }
    public void setNotifications(Integer notifications) { this.notifications = notifications; }
}
