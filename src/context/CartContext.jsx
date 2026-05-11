import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// =========================
// CREATE CONTEXT
// =========================
const CartContext = createContext(null);

// =========================
// PROVIDER
// =========================
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Lỗi đọc giỏ hàng:', error);
      localStorage.removeItem('cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // SAVE CART
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // ADD TO CART
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Sản phẩm không hợp lệ');
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id
      );

      // Nếu đã tồn tại -> tăng số lượng
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Nếu chưa tồn tại -> thêm mới
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
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
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  // CONTEXT VALUE
  const value = useMemo(
    () => ({
      cart,
      loading,

      addToCart,
      removeFromCart,

      updateQuantity,
      increaseQuantity,
      decreaseQuantity,

      clearCart,

      cartTotal,
      cartCount,
    }),
    [cart, loading, cartTotal, cartCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// CUSTOM HOOK
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart phải được sử dụng bên trong CartProvider'
    );
  }

  return context;
};

// EXPORT
export { CartContext };

export default CartContext;