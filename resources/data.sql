-- =========================================================================
-- 1. KHỞI TẠO LẠI DỮ LIỆU BẢNG USERS (Đã đồng bộ sạch chữ ROLE_)
-- =========================================================================
DELETE FROM users;

-- Tài khoản User mẫu (Mật khẩu đăng nhập: 123456)
INSERT INTO users (email, username, password, full_name, provider, role) 
VALUES ('user@nonglamfood.com', 'user_nonglam', '$2a$10$X50vU9AebpG6qN.lqdfaUeyCIEW.EFOeOQ82tHCSq04P4vjP1D8mO', 'Nguyen Van User', 'LOCAL', 'USER'); -- 👈 Chỉ để USER

-- Tài khoản Admin mẫu (Mật khẩu đăng nhập: 123456)
INSERT INTO users (email, username, password, full_name, provider, role) 
VALUES ('admin@nonglamfood.com', 'admin_nonglam', '$2a$10$X50vU9AebpG6qN.lqdfaUeyCIEW.EFOeOQ82tHCSq04P4vjP1D8mO', 'Tran Thi Admin', 'LOCAL', 'ADMIN'); -- 👈 Chỉ để ADMIN


-- =========================================================================
-- 2. KHỞI TẠO DỮ LIỆU BẢNG REVIEWS & PRODUCT QUESTIONS (Giữ nguyên bên dưới)
-- =========================================================================
DELETE FROM product_questions;
DELETE FROM reviews;

INSERT INTO reviews (product_id, user_name, rating_stars, content, created_at) VALUES
(1, 'Trần Minh Tâm', 5, 'Vỏ bưởi sấy dẻo rất thơm, vị ngọt thanh không gắt, hơi nhặng đắng nhẹ đặc trưng rất cuốn. Sẽ ủng hộ tiếp.', '2026-06-25 09:15:00'),
(1, 'Lê Thị Hồng', 4, 'Sản phẩm đóng gói đẹp, giao hàng nhanh. Trái cây sấy dẻo của Nonglamfood thì chất lượng khỏi bàn rồi.', '2026-06-26 14:30:00'),
(2, 'Nguyễn Hoàng Long', 5, 'Xoài sấy dẻo miếng dày, dẻo quánh, thơm phức mùi xoài chín tự nhiên. Trái cây sấy dẻo nhà mình thích mê!', '2026-06-27 10:20:00');

-- 1. Trả lời cho câu hỏi: "Sản phẩm này có sử dụng chất bảo quản không?"
INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) 
VALUES (1, 'Nonglamfood - Quản trị viên', 
'Sản phẩm của Nonglamfood cam kết 100% không sử dụng chất bảo quản, giữ nguyên hương vị tự nhiên của trái cây và đạt tiêu chuẩn an toàn thực phẩm.', 
(SELECT id FROM product_questions WHERE content = 'Sản phẩm này có sử dụng chất bảo quản không?' AND status = 'POPULAR'), 
'ANSWERED', TRUE, '2026-06-30 21:15:00');

-- 2. Trả lời cho câu hỏi: "Hạn sử dụng của vỏ bưởi sấy dẻo là bao lâu?"
INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) 
VALUES (1, 'Nonglamfood - Quản trị viên', 
'Vỏ bưởi sấy dẻo có hạn sử dụng 12 tháng kể từ ngày sản xuất khi chưa mở bao bì. Sau khi mở túi, bạn nên dùng hết trong vòng 1 tháng để đảm bảo chất lượng tốt nhất.', 
(SELECT id FROM product_questions WHERE content = 'Hạn sử dụng của vỏ bưởi sấy dẻo là bao lâu?' AND status = 'POPULAR'), 
'ANSWERED', TRUE, '2026-06-30 21:16:00');

-- 3. Trả lời cho câu hỏi: "Người tiểu đường có ăn được xoài sấy dẻo không?"
INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) 
VALUES (2, 'Nonglamfood - Quản trị viên', 
'Chào bạn, mặc dù là trái cây sấy tự nhiên, nhưng sản phẩm vẫn chứa hàm lượng đường tự nhiên từ xoài chín. Người tiểu đường nên hạn chế hoặc tham khảo ý kiến bác sĩ về khẩu phần ăn phù hợp ạ.', 
(SELECT id FROM product_questions WHERE content = 'Người tiểu đường có ăn được xoài sấy dẻo không?' AND status = 'POPULAR'), 
'ANSWERED', TRUE, '2026-06-30 21:17:00');

INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) VALUES
(1, 'Vũ Hoàng Yến', 'Sản phẩm này đạt tiêu chuẩn xuất khẩu sang châu Âu chưa shop?', NULL, 'ANSWERED', FALSE, '2026-06-24 15:00:00');

INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) VALUES
(1, 'Nonglamfood - Quản trị viên', 'Chào Hoàng Yến, tất cả sản phẩm sấy của Nonglamfood đều được sản xuất theo quy trình đạt chuẩn HACCP, ISO 22000 và đã xuất khẩu thành công sang các thị trường khó tính như Châu Âu, Úc, Singapore bạn nhé!', (SELECT MAX(id) FROM product_questions WHERE user_name = 'Vũ Hoàng Yến'), 'ANSWERED', TRUE, '2026-06-24 15:30:00');

INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) VALUES
(2, 'Nguyễn Đình Trọng', 'If mở túi ra ăn không hết thì bảo quản như thế nào để không bị cứng?', NULL, 'ANSWERED', FALSE, '2026-06-25 16:10:00');

INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) VALUES
(2, 'Nonglamfood - Quản trị viên', 'Chào bạn Trọng, sau khi mở bao bì, nếu dùng không hết bạn nên vuốt kín miệng túi zip và bảo quản trong ngăn mát tủ lạnh nhé!', (SELECT MAX(id) FROM product_questions WHERE user_name = 'Nguyễn Đình Trọng'), 'ANSWERED', TRUE, '2026-06-25 16:45:00');

INSERT INTO product_questions (product_id, user_name, content, parent_id, status, is_admin_reply, created_at) VALUES
(1, 'Lê Hoài Nam', 'Shop ơiii, vỏ bưởi này bị sai lỗi chính tả trên bao bì à? Mình mún mua sll làm quà tặng có triết khấu ko?', NULL, 'PENDING', FALSE, '2026-06-28 14:00:00'),
(2, 'Hoàng Thùy Linh', 'Xoài này có bị sượng hay nhìu sơ dừa không shop, răng yếu có nhai đc hk?', NULL, 'PENDING', FALSE, '2026-06-28 15:20:00'),
(3, 'Nguyễn Thị Thảo', 'Mún mua chanh dây sấy dẻo ship ra Hà Nội thì mất bủi ngày vậy shop?', NULL, 'PENDING', FALSE, '2026-06-28 16:15:00');

DELETE FROM products; -- Xóa cũ để làm mới

INSERT INTO products (name, description, price, stock_quantity, category, image_url) VALUES
('Vỏ bưởi sấy dẻo 100g', 'Vỏ bưởi thơm ngon, vị ngọt thanh', 45000, 100, 'Mới', '/assets/vobuoisaydeo.png'),
('Xoài sấy dẻo thượng hạng', 'Xoài chín tự nhiên, dẻo quánh', 65000, 80, 'Mới', '/assets/xoaisaydeo.png'),
('Thơm sấy dẻo', 'Dứa sấy dẻo thơm ngon', 0, 0, 'Trái cây sấy', '/assets/thomsaydeo.png'), -- Giá 0 vì là "Liên hệ"
('Chanh dây sấy dẻo', 'Vị chua ngọt hài hòa', 50000, 50, 'Trái cây sấy', '/assets/chanhdaysaydeo.png'),
('Đu đủ sấy dẻo', 'Đu đủ dẻo tự nhiên', 42000, 60, 'Trái cây sấy', '/assets/dudusaydeo.png');