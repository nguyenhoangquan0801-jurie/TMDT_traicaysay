export const mockOrders = [
  { 
    id: 101, 
    totalPrice: 172000, 
    status: 1, // Chờ xử lý 
    date: "24/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 2, price: 50000 },
      { name: "Xoài Cát Chu Sấy Dẻo Nông Lâm", quantity: 1, price: 59000 }
    ]
  },
  { 
    id: 102, 
    totalPrice: 68000, 
    status: 2,// Đã xác nhận
    date: "23/06/2026",
    items: [
      { name: "Xoài Cát Chu Sấy Dẻo Nông Lâm", quantity: 1, price: 59000 }
    ]
  },
  { 
    id: 103, 
    totalPrice: 250000, 
    status: 3,
    date: "20/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 5, price: 50000 }
    ]
  },
  { 
    id: 104, 
    totalPrice: 104000, 
    status: 0,
    date: "19/06/2026",
    items: [
      { name: "Thơm (Dứa) Sấy Dẻo Thượng Hạng", quantity: 2, price: 50000 }
    ]
  }
];
