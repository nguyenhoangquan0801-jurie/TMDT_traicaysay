-- Xóa bảng cũ nếu đã tồn tại để tránh xung đột khi restart
DROP TABLE IF EXISTS users;

-- Tạo cấu trúc bảng users khớp với Model Java
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NULL,
    full_name VARCHAR(100) NOT NULL,
    provider VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL
);