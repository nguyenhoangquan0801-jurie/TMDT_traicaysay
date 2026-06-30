import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const { user } = useAuth();

    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===========================
    // KEY LOCAL STORAGE
    // ===========================

    const cartKey = useMemo(() => {
        if (user?.email) {
            return `cart_${user.email}`;
        }

        return "cart_guest";
    }, [user]);

    const orderKey = useMemo(() => {
        if (user?.email) {
            return `orders_${user.email}`;
        }

        return "orders_guest";
    }, [user]);

    // ===========================
    // LOAD CART
    // ===========================

    useEffect(() => {

        setLoading(true);

        try {

            const savedCart = localStorage.getItem(cartKey);

            if (savedCart) {
                setCart(JSON.parse(savedCart));
            } else {
                setCart([]);
            }

            const savedOrders = localStorage.getItem(orderKey);

            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            } else {
                setOrders([]);
            }

        } catch (err) {

            console.error(err);

            setCart([]);
            setOrders([]);

        } finally {

            setLoading(false);

        }

    }, [cartKey, orderKey]);

    // ===========================
    // SAVE
    // ===========================

    useEffect(() => {

        if (loading) return;

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

        localStorage.setItem(
            orderKey,
            JSON.stringify(orders)
        );

    }, [
        cart,
        orders,
        cartKey,
        orderKey,
        loading,
    ]);

    // ===========================
    // ADD
    // ===========================

    const addToCart = useCallback((product, amount = 1) => {

        if (!product || !product.id) return;

        amount = Number(amount);

        if (amount <= 0) amount = 1;

        setCart((prev) => {

            const exist = prev.find(
                (item) => item.id === product.id
            );

            if (exist) {

                return prev.map((item) =>

                    item.id === product.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + amount,
                                  99
                              ),
                          }
                        : item
                );
            }

            return [

                ...prev,

                {

                    ...product,

                    quantity: Math.min(amount, 99),

                },

            ];

        });

    }, []);

    // ===========================
    // REMOVE
    // ===========================

    const removeFromCart = useCallback((id) => {

        setCart((prev) =>
            prev.filter((item) => item.id !== id)
        );

    }, []);

    // ===========================
    // UPDATE QUANTITY
    // ===========================

    const updateQuantity = useCallback((id, quantity) => {

        quantity = Number(quantity);

        if (quantity <= 0) {

            removeFromCart(id);

            return;
        }

        if (quantity > 99) {

            quantity = 99;

        }

        setCart((prev) =>

            prev.map((item) =>

                item.id === id

                    ? {

                          ...item,

                          quantity,

                      }

                    : item
            )

        );

    }, [removeFromCart]);

    // ===========================
    // +
    // ===========================

    const increaseQuantity = useCallback((id) => {

        setCart((prev) =>

            prev.map((item) =>

                item.id === id

                    ? {

                          ...item,

                          quantity: Math.min(
                              item.quantity + 1,
                              99
                          ),

                      }

                    : item

            )

        );

    }, []);

    // ===========================
    // -
    // ===========================

    const decreaseQuantity = useCallback((id) => {

        setCart((prev) =>

            prev.flatMap((item) => {

                if (item.id !== id) {

                    return item;

                }

                if (item.quantity <= 1) {

                    return [];

                }

                return {

                    ...item,

                    quantity: item.quantity - 1,

                };

            })

        );

    }, []);

    // ===========================
    // CLEAR
    // ===========================

    const clearCart = useCallback(() => {

        setCart([]);

    }, []);

    // ===========================
    // TOTAL PRICE
    // ===========================

    const cartTotal = useMemo(() => {

        return cart.reduce(

            (sum, item) =>

                sum +

                Number(item.price || 0) *

                    Number(item.quantity || 1),

            0

        );

    }, [cart]);

    // ===========================
    // TOTAL ITEM
    // ===========================

    const cartCount = useMemo(() => {

        return cart.reduce(

            (sum, item) =>

                sum +

                Number(item.quantity || 1),

            0

        );

    }, [cart]);

    // ==========================
  // CREATE ORDER
  // ==========================
  const addOrderFromCart = useCallback((cartItems, totalPrice) => {

    if (!cartItems || cartItems.length === 0) return;

    const newOrder = {
        id: Date.now(),
        orderDate: new Date().toLocaleString("vi-VN"),
        totalAmount: totalPrice,
        status: "PENDING",
        items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price
        }))
    };

    setOrders(prev => [newOrder, ...prev]);

    clearCart();

}, [clearCart]);

  // ==========================
  // CANCEL ORDER
  // ==========================
  const cancelOrder = useCallback((orderId) => {

    setOrders(prev =>
        prev.map(order =>
            order.id === orderId &&
            order.status === "PENDING"
                ? {
                      ...order,
                      status: "CANCELLED"
                  }
                : order
        )
    );

}, []);

  // ==========================
  // UPDATE STATUS
  // ==========================
  const updateOrderStatus = useCallback((orderId, status) => {

    setOrders(prev =>
        prev.map(order =>
            order.id === orderId
                ? {
                      ...order,
                      status
                  }
                : order
        )
    );

}, []);
    // ==========================
  // CONTEXT VALUE
  // ==========================
  const value = useMemo(
  () => ({
    cart,
    orders,
    loading,

    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,

    addOrderFromCart,
    cancelOrder,
    updateOrderStatus,
    setOrders,

    cartTotal,
    cartCount,
  }),
  [
    cart,
    orders,
    loading,

    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,

    addOrderFromCart,
    cancelOrder,
    updateOrderStatus,

    cartTotal,
    cartCount,
  ]
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
      "useCart phải được sử dụng trong CartProvider"
    );
  }

  return context;
};

export default CartContext;
