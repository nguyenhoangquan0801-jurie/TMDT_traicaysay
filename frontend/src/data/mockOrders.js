export const mockOrders = [
  { 
    id: 101, 
    totalPrice: 172000, 
    status: 1, 
    date: "24/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 2, price: 50000 },
      { name: "Xoài Cát Chu Sấy Dẻo Nông Lâm", quantity: 1, price: 59000 }
    ]
  },
  { 
    id: 102, 
    totalPrice: 68000, 
    status: 2,
    date: "23/06/2026",
    items: [
      { name: "Xoài Cát Chu Sấy Dẻo Nông Lâm", quantity: 1, price: 59000 }
    ]
  },
  { 
    id: 103, 
    totalPrice: 250000, 
    status: 3, // Đơn này đã hoàn thành
    date: "20/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 5, price: 50000 }
    ]
  },
  { 
    id: 104, 
    totalPrice: 104000, 
    status: 0, // Đơn này đã hủy
    date: "19/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 2, price: 50000 }
    ]
  }
];

// Dữ liệu khách hàng hiện tại 
export let mockUser = {
  id: 1,
  name: "Phạm Thị Nhựt Duy",
  points: 0 
};

// Danh sách các Voucher để đổi
export const mockVouchers = [
  { id: "VOUCHER10", name: "Voucher Giảm 10k", pointsRequired: 50, description: "Đổi bằng 50 điểm tích lũy" },
  { id: "VOUCHER50", name: "Voucher Giảm 50k", pointsRequired: 200, description: "Đổi bằng 200 điểm tích lũy" },
  { id: "FREESHIP", name: "Mã Miễn Phí Vận Chuyển", pointsRequired: 30, description: "Đổi bằng 30 điểm tích lũy" }
];

// Kho lưu trữ các voucher mà User đã đổi thành công 
export let userVoucherWallet = [];

/**
 * Cập nhật trạng thái đơn hàng & Tự động tích điểm
 * @param {number} orderId - ID của đơn hàng cần duyệt
 * @param {number} newStatus - Trạng thái mới muốn chuyển (0, 1, 2, 3)
 */
export function updateOrderStatus(orderId, newStatus) {
  // Tìm đơn hàng trong danh sách
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) {
    return { success: false, message: "Không tìm thấy đơn hàng trong hệ thống!" };
  }

  // Nếu đơn hàng đã Hoàn thành hoặc đã Hủy thì không được sửa
  if (order.status === 3 || order.status === 0) {
    return { success: false, message: "Đơn hàng này đã kết thúc, không thể thay đổi trạng thái nữa." };
  }

  // Cập nhật trạng thái mới cho đơn hàng
  order.status = newStatus;

  // Nếu trạng thái mới truyền vào là 3 (Đã hoàn thành)
  if (newStatus === 3) {
    const pointsEarned = Math.floor(order.totalPrice / 10000); 
    mockUser.points += pointsEarned; // Cộng điểm vào tài khoản người dùng
    
    return { 
      success: true, 
      message: `Đơn hàng #${orderId} hoàn thành! Tự động cộng +${pointsEarned} điểm thưởng cho khách hàng.`,
      currentPoints: mockUser.points 
    };
  }

  return { success: true, message: `Cập nhật trạng thái đơn hàng #${orderId} thành công!` };
}

/**
 * Quy đổi điểm tích lũy thành Voucher khuyến mãi
 * @param {string} voucherId - ID của voucher muốn đổi 
 */
export function redeemVoucher(voucherId) {
  // Tìm voucher 
  const voucher = mockVouchers.find(v => v.id === voucherId);
  if (!voucher) {
    return { success: false, message: "Mã khuyến mãi này không tồn tại!" };
  }

  // Kiểm tra số điểm hiện tại của người dùng xem có đủ để đổi hay không
  if (mockUser.points < voucher.pointsRequired) {
    return { 
      success: false, 
      message: `Đổi thất bại! Bạn cần ${voucher.pointsRequired} điểm, hiện tại bạn chỉ có ${mockUser.points} điểm.` 
    };
  }

  // Tiến hành trừ điểm và thêm voucher vào ví của người dùng
  mockUser.points -= voucher.pointsRequired;
  
  // Lưu voucher vào ví cá nhân của người dùng 
  userVoucherWallet.push({ 
    ...voucher, 
    redeemedAt: new Date().toLocaleDateString('vi-VN'), // Lưu ngày đổi mã
    isUsed: false // Mặc định mã mới đổi chưa được sử dụng
  });

  return { 
    success: true, 
    message: `Chúc mừng bạn đã đổi thành công: ${voucher.name}!`, 
    currentPoints: mockUser.points 
  };
}

// =========================================================================
// KHU VỰC CHẠY THỬ NGHIỆM TỰ ĐỘNG (TỰ ĐỘNG KÍCH HOẠT KHI FILE ĐƯỢC LOAD)
// =========================================================================
console.log("%c--- BẮT ĐẦU CHẠY THỬ LOGIC TÍCH ĐIỂM & ĐỔI VOUCHER ---", "color: #00bcd4; font-weight: bold;");
console.log(`Khách hàng: ${mockUser.name} | Điểm hiện có: ${mockUser.points}`);

// Bước 1: Thử đổi voucher khi chưa có điểm
console.log("\n[Bước 1] Duy đổi mã FREESHIP (yêu cầu 30 điểm):");
console.log(redeemVoucher("FREESHIP"));

// Bước 2: Hoàn thành đơn hàng 101 để nhận điểm tự động
console.log("\n[Bước 2] Admin duyệt hoàn thành đơn hàng #101 (Trị giá 172.000đ):");
console.log(updateOrderStatus(101, 3)); 

// Bước 3: Hoàn thành thêm đơn 102 để tích lũy thêm điểm
console.log("\n[Bước 3] Admin duyệt hoàn thành đơn hàng #102 (Trị giá 68.000đ):");
console.log(updateOrderStatus(102, 3)); 
console.log(`=> Tổng điểm sau 2 đơn hàng thành công: ${mockUser.points} điểm.`);

// Bước 4: Giả lập tích lũy thêm điểm (đạt 60 điểm) để test đổi voucher thành công
console.log("\n[Bước 4] Giả lập Duy mua thêm hàng, điểm tăng lên 60.");
mockUser.points = 60;

// Bước 5: Đổi lại voucher khi đã đủ điểm
console.log("\n[Bước 5] Duy thực hiện đổi lại mã VOUCHER10 (yêu cầu 50 điểm):");
console.log(redeemVoucher("VOUCHER10"));

// Kiểm tra kết quả ví cá nhân
console.log("\n[Kết quả] Kiểm tra ví Voucher hiện tại của Duy:");
console.table(userVoucherWallet);
console.log("%c--- KẾT THÚC KỊCH BẢN CHẠY THỬ ---", "color: #4caf50; font-weight: bold;");