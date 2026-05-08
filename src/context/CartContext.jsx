import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((i) => i.id === product.id);

            if (exist) {
                return prev.map((i) =>
                    i.id === product.id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, qty: i.qty - 1 } : i
                )
                .filter((i) => i.qty > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const [orders, setOrders] = useState([]); // 🧾 lưu đơn hàng

    const checkout = () => {
        if (cart.length === 0) return;

        const totalQty = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        // 🚨 GIỚI HẠN 15 SẢN PHẨM
        if (totalQty > 15) {
            alert("❌ Không được đặt quá 15 sản phẩm!");
            return;
        }

        const newOrder = {
            id: Date.now(),
            items: cart,
            total: cart.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            ),
            createdAt: new Date().toLocaleString(),
        };

        setCart([]);
        setIsCartOpen(false);

        const checkout = () => {
            setCart([]);
        };
        console.log("ORDER:", newOrder);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                toggleCart,
                addToCart,
                decreaseQty,
                removeFromCart,
                checkout,
                orders,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
