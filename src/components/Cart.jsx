import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpenCart = () => setIsOpen(true);
        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, []);

    const closeCart = () => setIsOpen(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex justify-end" onClick={closeCart}>
            <div 
                className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-green-700">
                        Giỏ hàng ({cart.length})
                    </h2>
                    <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <p className="text-center py-12 text-gray-500">Giỏ hàng trống</p>
                    ) : (
                        cart.map(item => {
                            // Bảo vệ item
                            if (!item || !item.id) return null;

                            return (
                                <div key={item.id} className="flex gap-4 border-b pb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl text-white font-bold">
                                        {item.name?.charAt(0) || '?'}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name || 'Sản phẩm không xác định'}</h4>
                                        <p className="text-green-600 font-bold mt-1">
                                            {Number(item.price || 0).toLocaleString('vi-VN')}đ
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                                className="border w-8 h-8 rounded hover:bg-gray-100"
                                            >
                                                −
                                            </button>
                                            <span className="font-medium w-6 text-center">{item.quantity || 1}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                                className="border w-8 h-8 rounded hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between text-xl font-bold mb-6">
                            <span>Tổng tiền:</span>
                            <span className="text-green-600">
                                {Number(cartTotal || 0).toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                        <button 
                            onClick={() => { closeCart(); navigate('/checkout'); }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold"
                        >
                            Thanh toán ngay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;