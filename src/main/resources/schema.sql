-- Xóa bảng cũ nếu đã tồn tại để tránh xung đột khi restart
-- Lưu ý: Phải drop các bảng có ràng buộc khóa ngoại (nếu có) trước hoặc dùng CASCADE
DROP TABLE IF EXISTS product_questions;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

-- Tạo cấu trúc bảng users khớp với Model Java (Đã cập nhật thêm username)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE, -- 💡 CẬP NHẬT MỚI: Thêm cột tên đăng nhập bắt buộc và duy nhất
    password VARCHAR(255) NULL,
    full_name VARCHAR(100) NOT NULL,
    provider VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL
);

-- 1. Tạo bảng Đánh giá (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    rating_stars INT NOT NULL CHECK (rating_stars BETWEEN 1 AND 5),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Tạm thời comment khóa ngoại đến bảng products nếu bạn chưa chèn dữ liệu bảng products trước file này
    -- FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 2. Tạo bảng Câu hỏi & Câu trả lời (Product Questions)
CREATE TABLE IF NOT EXISTS product_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    parent_id BIGINT DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ANSWERED, POPULAR
    is_admin_reply BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES product_questions(id) ON DELETE CASCADE
);