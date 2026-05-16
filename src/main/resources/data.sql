DELETE FROM users;

-- Chú ý chữ 'LOCAL' đã được viết hoa toàn bộ để khớp với ENUM trong code Java
INSERT INTO users (email, password, full_name, provider, role) 
VALUES ('user@nonglamfood.com', '$2a$10$R77pOnp9b5GZ6H4W8EunOunvLdf7EVE0U6gA8W2TfOqQ3uD.hH91a', 'Nguyen Van User', 'LOCAL', 'ROLE_USER');

INSERT INTO users (email, password, full_name, provider, role) 
VALUES ('admin@nonglamfood.com', '$2a$10$R77pOnp9b5GZ6H4W8EunOunvLdf7EVE0U6gA8W2TfOqQ3uD.hH91a', 'Tran Thi Admin', 'LOCAL', 'ROLE_ADMIN');