import React, { useState, useEffect } from 'react';
import OrderDetail from './OrderDetail'; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Đường dẫn API kết nối đến Spring Boot 
  const API_URL = "http://localhost:8080/api/orders";

  // Hàm gọi API lấy danh sách đơn hàng từ MySQL qua Spring Boot
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Không thể lấy dữ liệu đơn hàng");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi kết nối Backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm cập nhật trạng thái đơn hàng 
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      // Cập nhật State trên UI 
      setOrders(prevOrders =>
        prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
      );
      alert("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      alert("Lỗi: Không thể cập nhật trạng thái đơn hàng!");
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>Đang tải danh sách đơn hàng từ Hệ thống...</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2b9348', fontSize: '24px', fontWeight: 'bold' }}>
        LỊCH SỬ ĐẶT HÀNG
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Chưa có đơn hàng nào trong hệ thống.</p>
        ) : (
          orders.map((order) => (
            <OrderDetail 
              key={order.id} 
              orderId={order.id} 
              currentStatus={order.status} 
              totalPrice={Number(order.totalAmount)}   
              date={order.orderDate}               
              items={order.items || []}              
              onUpdateStatus={handleUpdateOrderStatus}  
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;