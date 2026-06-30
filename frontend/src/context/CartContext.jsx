import { createContext, useContext, useEffect, useMemo, useState, } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // State lưu danh sách đơn hàng động
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      // Tải đơn hàng cũ từ localStorage 
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Lỗi đọc dữ liệu:', error);
      localStorage.removeItem('cart');
      localStorage.removeItem('orders');
    } finally {
      setLoading(false);
    }
  }, []);

  // SAVE CART & ORDERS
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
      // Tự động lưu danh sách đơn hàng vào localStorage khi có đơn mới
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [cart, orders, loading]); // Theo dõi biến orders 

  // Thêm tham số `amount` và mặc định bằng 1 nếu không truyền vào
  const addToCart = (product, amount = 1) => {
    if (!product || !product.id) {
      console.error('Sản phẩm không hợp lệ');
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      // Nếu đã tồn tại -> cộng dồn với số lượng thực tế được truyền vào
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + amount,
            }
            : item
        );
      }

      // Nếu chưa tồn tại -> thêm mới với số lượng thực tế được truyền vào
      return [
        ...prevCart,
        {
          ...product,
          quantity: amount,
        },
      ];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {
    // Nếu số lượng <= 0 thì xóa luôn
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity,
          }
          : item
      )
    );
  };

  // INCREASE
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL PRICE
  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price || 0) * item.quantity,
      0
    );
  }, [cart]);

  // TOTAL COUNT
  const cartCount = useMemo(() => {
    return cart.length;
  }, [cart]);

  const addOrderFromCart = (cartItems, totalPrice) => {
    if (!cartItems || cartItems.length === 0) return;

    const newOrder = {
      id: Math.floor(Math.random() * 900) + 103,
      totalAmount: totalPrice,
      orderDate: new Date().toLocaleDateString('vi-VN'),

      status: 1,

      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      orders,
      setOrders,
      addOrderFromCart,

      addToCart,
      removeFromCart,

      updateQuantity,
      increaseQuantity,
      decreaseQuantity,

      clearCart,

      cartTotal,
      cartCount,
    }),
    [cart, loading, orders, cartTotal, cartCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart phải được sử dụng bên trong CartProvider'
    );
  }

  return context;
};

export { CartContext };
export default CartContext;