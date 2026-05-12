import React from 'react';
//test layout cho dashboard
const SellerDashboard = () => {
  const todoItems = [
    { label: 'Chờ xác nhận', count: 0 },
    { label: 'Chờ lấy hàng', count: 0 },
    { label: 'Đã xử lý', count: 0 },
    { label: 'Đơn hủy', count: 0 },
    { label: 'Trả hàng', count: 0 },
    { label: 'Bị tạm khóa', count: 0 },
    { label: 'Sản phẩm hết hàng', count: 0 },
    { label: 'Chương trình khuyến mãi', count: 0 },
  ];

  return (
    <div className="p-8 flex flex-col gap-8">
      <section className="bg-[#ffffff] border-2 border-black rounded-sm shadow-sm">
        <div className="p-4 border-b-2 border-black">
          <h2 className="text-xl font-bold text-black">Việc cần làm</h2>
        </div>
   
        <div className="grid grid-cols-4">
          {todoItems.map((item, index) => (
            <div 
              key={index} 
              className={`
                flex flex-col items-center justify-center p-8 bg-[#ffffff]
                border-black
                ${index < 4 ? 'border-b-2' : ''} 
                ${(index + 1) % 4 !== 0 ? 'border-r-2' : ''}
                hover:bg-gray-300 transition-colors cursor-pointer
              `}
            >
              <span className="text-3xl font-bold text-black mb-2">{item.count}</span>
              <span className="text-sm font-semibold text-black text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#ffffff] border-2 border-black rounded-sm shadow-sm min-h-[400px]">
        <div className="p-4 border-b-2 border-black">
          <h2 className="text-xl font-bold text-black">Phân tích bán hàng</h2>
        </div>
        <div className="p-8">
          <div className="w-full h-64 bg-[#ffffff] border-2 border-dashed border-gray-600 flex items-center justify-center">
             <span className="text-gray-700 font-medium italic">Biểu đồ phân tích sẽ hiển thị tại đây...</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;