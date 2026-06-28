package vn.edu.nlu.fit.nonglamfood.dto;

import vn.edu.nlu.fit.nonglamfood.model.Seller;

public class SellerInfoDTO {
    private String shopName;
    private String username;
    private String role;
    private Integer notifications;

    public SellerInfoDTO() {}

    public SellerInfoDTO(Seller seller) {
        this.shopName = seller.getShopName();
        this.username = seller.getUser().getUsername();
        this.role = "Shop Đối Tác";
        this.notifications = 3;
    }

    // Getters and Setters
    public String getShopName() { return shopName; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Integer getNotifications() { return notifications; }
    public void setNotifications(Integer notifications) { this.notifications = notifications; }
}
