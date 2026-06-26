import React from 'react';
import OrderDetail from './OrderDetail'; 
import { useCart } from '../context/CartContext'; 

const OrderHistory = () => {
  
  const { orders, setOrders } = useCart();

  // Hàm cập nhật trạng thái đơn hàng 
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus }; // Đổi trạng thái của đơn hàng được chọn
      }
      return order;
    });
    setOrders(updatedOrders); // Cập nhật lại danh sách trong Context để lưu vào localStorage
    alert("Cập nhật trạng thái đơn hàng thành công!");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2b9348', fontSize: '24px', fontWeight: 'bold' }}>
        DANH SÁCH QUẢN LÝ ĐƠN HÀNG
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {/* Nếu chưa có đơn hàng nào thì báo trống */}
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', py: '20px' }}>Chưa có đơn hàng nào được đặt.</p>
        ) : (
          orders.map((order) => (
            <OrderDetail 
              key={order.id} 
              orderId={order.id} 
              currentStatus={order.status} 
              totalPrice={order.totalAmount}   
              date={order.orderDate}              
              items={order.items}             
              onUpdateStatus={handleUpdateOrderStatus}  
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;