package vn.edu.nlu.fit.nonglamfood.dto;

import vn.edu.nlu.fit.nonglamfood.model.Product;

public class ProductDTO {
    private String id;
    private String name;
    private String sku;
    private String category;
    private Double price;
    private Integer stock;
    private Integer sales;
    private String status;
    private String imageColor;
    private String imageUrl;

    public ProductDTO() {
    }

    public ProductDTO(Product product) {
        this.id = "PROD-" + String.format("%03d", product.getId());
        this.name = product.getName();
        this.sku = "SKU" + product.getId() + "NL";

        String nameLower = product.getName().toLowerCase();
        if (nameLower.contains("hạt") || nameLower.contains("macca") || nameLower.contains("điều")) {
            this.category = "Hạt dinh dưỡng";
            this.imageColor = "bg-stone-100 text-stone-700";
        } else if (nameLower.contains("trà") || nameLower.contains("cúc") || nameLower.contains("thảo mộc")) {
            this.category = "Trà & Thảo mộc";
            this.imageColor = "bg-yellow-50 text-yellow-600";
        } else if (nameLower.contains("giòn")) {
            this.category = "Trái cây sấy giòn";
            this.imageColor = "bg-purple-100 text-purple-700";
        } else {
            this.category = "Trái cây sấy dẻo";
            this.imageColor = "bg-amber-100 text-amber-700";
        }

        this.price = product.getPrice() != null ? product.getPrice().doubleValue() : 0.0;
        this.stock = product.getStock();

        this.sales = (int) ((product.getId() * 23) % 200) + 15;
        this.status = product.getStock() > 0 ? "active" : "unlisted";
        this.imageUrl = product.getImageUrl();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImageColor() {
        return imageColor;
    }

    public void setImageColor(String imageColor) {
        this.imageColor = imageColor;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
