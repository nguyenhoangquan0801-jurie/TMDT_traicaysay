import React from 'react';

const OrderDetail = ({ orderId, currentStatus, onUpdateStatus, totalPrice, date, items }) => {

  // Hàm trả về nhãn trạng thái đơn hàng 
  const renderStatusBadge = () => {
    switch(currentStatus) {
      case 1: return <span style={{backgroundColor: '#fff7e6', color: '#d46b08', border: '1px solid #ffd591', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>Chờ xử lý</span>;
      case 2: return <span style={{backgroundColor: '#e6f7ff', color: '#096dd9', border: '1px solid #91d5ff', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>Đã xác nhận (Chờ giao)</span>;
      case 3: return <span style={{backgroundColor: '#f6ffed', color: '#389e0d', border: '1px solid #b7eb8f', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>Đã giao thành công</span>;
      case 0: return <span style={{backgroundColor: '#fff1f0', color: '#cf1322', border: '1px solid #ffa39e', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>Đã hủy</span>;
      default: return null;
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e8e8e8', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '15px' }}>
      
      {/* Tiêu đề đơn hàng: Mã đơn + Ngày + Nhãn trạng thái */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px', marginBottom: '15px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Mã đơn hàng: #{orderId}</h3>
          <span style={{ fontSize: '12px', color: '#888' }}>Ngày đặt: {date}</span>
        </div>
        <div>{renderStatusBadge()}</div>
      </div>

      {/* Chi tiết sản phẩm có trong đơn hàng */}
      <div style={{ marginBottom: '15px' }}>
        {items && items.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#555' }}>
            <span>{item.name} <strong style={{ color: '#222' }}>x{item.quantity}</strong></span>
            <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
          </div>
        ))}
      </div>

      {/* Tổng số tiền thanh toán */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginBottom: '15px' }}>
        <span style={{ fontWeight: '500' }}>Tổng thanh toán:</span>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ee4d2d' }}> {/* Đổi sang màu cam Shopee */}
          {totalPrice ? totalPrice.toLocaleString('vi-VN') : 0} đ
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #f0f0f0' }}>        
        {/* Giao diện của người mua */}
        <div>
          {currentStatus === 1 ? (
            <button 
              onClick={() => onUpdateStatus(orderId, 0)} // Người mua bấm hủy đơn khi chưa xác nhận
              style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
            >
              Hủy đơn hàng 
            </button>
          ) : currentStatus === 0 ? (
            <span style={{ fontSize: '13px', color: '#ff4d4f', fontWeight: '500' }}>Bạn đã hủy đơn này</span>
          ) : (
            <span style={{ fontSize: '13px', color: '#888' }}>Không thể hủy (Đơn đã được xử lý)</span>
          )}
        </div>

        {/* Giao diện của người bán */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', fontStyle: 'italic' }}>Kênh Người Bán:</span>
          
          {currentStatus === 1 && (
            <button 
              onClick={() => onUpdateStatus(orderId, 2)} // Người bán bấm chuẩn bị hàng
              style={{ backgroundColor: '#1890ff', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
            >
              Xác nhận & Chuẩn bị hàng
            </button>
          )}
          
          {currentStatus === 2 && (
            <button 
              onClick={() => onUpdateStatus(orderId, 3)} 
              style={{ backgroundColor: '#52c41a', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
            >
              Xác nhận Đã Giao
            </button>
          )}
          
          {currentStatus === 3 && <span style={{ fontSize: '13px', color: '#52c41a', fontWeight: '500' }}>Đơn đã hoàn thành</span>}
          {currentStatus === 0 && <span style={{ fontSize: '13px', color: '#999' }}>Đơn đã đóng</span>}
        </div>
      </div>

    </div>
  );
};

export default OrderDetail;