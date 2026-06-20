import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [removingId, setRemovingId] = useState(null);

    // Total quantity 
    const totalItems = cart.length;
    
    // Open with animation
    const handleOpenCart = useCallback(() => {
        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
    }, []);

    // Close with animation
    const closeCart = useCallback(() => {
        setIsAnimating(false);
        setTimeout(() => setIsOpen(false), 300); // Match transition duration
    }, []);

    useEffect(() => {
        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, [handleOpenCart]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) closeCart();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeCart]);

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Animated item removal
    const handleRemove = async (itemId) => {
        setRemovingId(itemId);
        setTimeout(() => {
            removeFromCart(itemId);
            setRemovingId(null);
        }, 300);
    };

    const handleCheckout = () => {
        closeCart();
        // Small delay to let cart close animation finish
        setTimeout(() => navigate('/checkout'), 300);
    };

    if (!isOpen) return null;

    return (
        // Backdrop with fade animation
        <div 
            className={`fixed inset-0 z-[1000] flex justify-end transition-colors duration-300 ${
                isAnimating ? 'bg-black/60' : 'bg-black/0'
            }`}
            onClick={closeCart}
            role="dialog"
            aria-modal="true"
            aria-label="Giỏ hàng"
        >
            {/* Slide-in panel */}
            <div 
                className={`w-full max-w-md h-full bg-white shadow-2xl flex flex-col 
                    transition-transform duration-300 ease-out ${
                    isAnimating ? 'translate-x-0' : 'translate-x-full'
                }`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <CartHeader 
                    totalItems={totalItems} 
                    onClose={closeCart}
                    onClear={clearCart}
                    hasItems={cart.length > 0}
                />

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <EmptyCart onClose={closeCart} />
                    ) : (
                        cart.map(item => {
                            if (!item?.id) return null;
                            return (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    isRemoving={removingId === item.id}
                                    onRemove={handleRemove}
                                    onUpdateQuantity={updateQuantity}
                                />
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <CartFooter 
                        cartTotal={cartTotal}
                        onCheckout={handleCheckout}
                    />
                )}
            </div>
        </div>
    );
};

// Sub-components
const CartHeader = ({ totalItems, onClose, onClear, hasItems }) => (
    <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0">
        <div className="flex items-center gap-3">
            <ShoppingCart className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-green-700">
                Giỏ hàng
                {/* Shows total quantity, not unique items */}
                <span className="ml-2 text-sm font-normal text-gray-500">
                    ({totalItems} sản phẩm)
                </span>
            </h2>
        </div>
        <div className="flex items-center gap-2">
            {/* Clear all button */}
            {hasItems && (
                <button 
                    onClick={onClear}
                    className="text-xs text-red-400 hover:text-red-600 px-2 py-1 
                               hover:bg-red-50 rounded transition-colors"
                    aria-label="Xóa tất cả"
                >
                    Xóa tất cả
                </button>
            )}
            <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Đóng giỏ hàng"
            >
                <X size={24} />
            </button>
        </div>
    </div>
);

// Extracted CartItem component
const CartItem = ({ item, isRemoving, onRemove, onUpdateQuantity }) => {
    const subtotal = (item.price || 0) * (item.quantity || 1);

    return (
        <div className={`flex gap-4 border-b pb-4 transition-all duration-300 ${
            isRemoving ? 'opacity-0 scale-95 -translate-x-4' : 'opacity-100 scale-100'
        }`}>
            {/* Product Image / Placeholder */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 
                            rounded-2xl flex items-center justify-center text-4xl 
                            text-white font-bold shrink-0">
                {item.image ? (
                    <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-2xl"
                    />
                ) : (
                    item.name?.charAt(0).toUpperCase() || '?'
                )}
            </div>

            <div className="flex-1 min-w-0">
                {/* Name */}
                <h4 className="font-semibold text-gray-800 truncate">
                    {item.name || 'Sản phẩm không xác định'}
                </h4>

                {/* Unit price */}
                <p className="text-gray-400 text-sm mt-0.5">
                    {Number(item.price || 0).toLocaleString('vi-VN')}đ / sản phẩm
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                    <QuantityButton
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Giảm số lượng"
                    >
                        <Minus size={12} />
                    </QuantityButton>

                    <span className="font-medium w-8 text-center tabular-nums">
                        {item.quantity || 1}
                    </span>

                    <QuantityButton
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Tăng số lượng"
                    >
                        <Plus size={12} />
                    </QuantityButton>

                    {/* Subtotal per item */}
                    <span className="ml-auto text-green-600 font-bold text-sm">
                        {subtotal.toLocaleString('vi-VN')}đ
                    </span>
                </div>
            </div>

            {/* Remove button */}
            <button 
                onClick={() => onRemove(item.id)} 
                className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 
                        rounded-lg transition-colors self-start"
                aria-label={`Xóa ${item.name}`}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

// Reusable quantity button
const QuantityButton = ({ children, disabled, onClick, ...props }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`border w-8 h-8 rounded-lg flex items-center justify-center 
                   transition-colors ${
                       disabled 
                           ? 'opacity-30 cursor-not-allowed' 
                           : 'hover:bg-gray-100 active:bg-gray-200'
                   }`}
        {...props}
    >
        {children}
    </button>
);

// Empty state component
const EmptyCart = ({ onClose }) => (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart size={40} className="text-gray-300" />
        </div>
        <p className="text-gray-400 text-lg font-medium">Giỏ hàng trống</p>
        <p className="text-gray-300 text-sm text-center">
            Hãy thêm sản phẩm vào giỏ hàng của bạn
        </p>
        <button
            onClick={onClose}
            className="mt-2 text-green-600 hover:text-green-700 font-medium 
                       flex items-center gap-1"
        >
            Tiếp tục mua sắm <ArrowRight size={16} />
        </button>
    </div>
);

// Footer with total
const CartFooter = ({ cartTotal, onCheckout }) => (
    <div className="p-6 border-t bg-gray-50">
        {/* Subtotal row */}
        <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Tạm tính:</span>
            <span>{Number(cartTotal || 0).toLocaleString('vi-VN')}đ</span>
        </div>

        {/* Shipping note */}
        <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Phí vận chuyển:</span>
            <span className="text-green-600 font-medium">Miễn phí</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold mb-6">
            <span>Tổng tiền:</span>
            <span className="text-green-600">
                {Number(cartTotal || 0).toLocaleString('vi-VN')}đ
            </span>
        </div>

        <button 
            onClick={onCheckout}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 
                       text-white py-4 rounded-2xl font-bold transition-colors
                       flex items-center justify-center gap-2"
        >
            Thanh toán ngay
            <ArrowRight size={20} />
        </button>
    </div>
);

export default Cart;
