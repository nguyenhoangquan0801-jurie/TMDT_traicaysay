import React, { useContext } from "react";
import { FaPlus, FaMinus, FaTrash, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext, } from "../context/CartContext";

const Cart = () => {

    const navigate = useNavigate();

    const {
        cart,
        isCartOpen,
        addToCart,
        decreaseQty,
        removeFromCart,
        toggleCart,
    } = useContext(CartContext);

    if (!isCartOpen) return null;

    const total = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.qty,
        0
    );

    return (
        <div style={styles.overlay}>

            <div style={styles.cart}>

                <h2 style={styles.title}>
                    🛒 Giỏ hàng
                </h2>

                {cart.length === 0 ? (
                    <p style={styles.empty}>
                        Chưa có sản phẩm
                    </p>
                ) : (
                    <>
                        {cart.map((item) => (

                            <div
                                key={item.id}
                                style={styles.item}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={styles.image}
                                />

                                <div style={styles.info}>

                                    <h4 style={styles.name}>
                                        {item.name}
                                    </h4>

                                    <p style={styles.price}>
                                        {item.price.toLocaleString()}
                                        đ
                                    </p>

                                    <div style={styles.qtyBox}>

                                        <div
                                            style={styles.icon}
                                            onClick={() =>
                                                decreaseQty(item.id)
                                            }
                                        >
                                            <FaMinus />
                                        </div>

                                        <span style={styles.qty}>
                                            {item.qty}
                                        </span>

                                        <div
                                            style={styles.icon}
                                            onClick={() =>
                                                addToCart(item)
                                            }
                                        >
                                            <FaPlus />
                                        </div>
                                    </div>
                                </div>

                                <FaTrash
                                    style={styles.deleteIcon}
                                    onClick={() =>
                                        removeFromCart(
                                            item.id
                                        )
                                    }
                                />
                            </div>
                        ))}

                        <div style={styles.totalBox}>

                            <h3>
                                Tổng tiền:
                            </h3>

                            <h2 style={styles.total}>
                                {total.toLocaleString()}
                                đ
                            </h2>
                        </div>

                        <button
                            style={styles.checkoutBtn}
                            onClick={() => {

                                // ĐÓNG CART
                                toggleCart();

                                // CHUYỂN TRANG
                                navigate("/checkout");
                            }}
                        >
                            THANH TOÁN
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {

    overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 999,
    },

    cart: {
        width: "400px",
        height: "100vh",
        background: "#fff",
        padding: "25px",
        overflowY: "auto",
        boxShadow: "-5px 0 15px rgba(0,0,0,0.15)",
    },

    title: {
        marginBottom: "25px",
        color: "#2e7d32",
        borderBottom: "2px solid #eee",
        paddingBottom: "10px",
    },

    empty: {
        textAlign: "center",
        marginTop: "50px",
        color: "#777",
    },

    item: {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px",
        borderBottom: "1px solid #eee",
        paddingBottom: "15px",
    },

    image: {
        width: "85px",
        height: "85px",
        objectFit: "cover",
        borderRadius: "12px",
        border: "1px solid #eee",
    },

    info: {
        flex: 1,
    },

    name: {
        fontSize: "15px",
        marginBottom: "8px",
        color: "#333",
    },

    price: {
        color: "#e53935",
        fontWeight: "bold",
        marginBottom: "12px",
    },

    qtyBox: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    icon: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#e9f1ea",
        color: "#151111",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
    },

    qty: {
        minWidth: "20px",
        textAlign: "center",
        fontWeight: "bold",
    },

    deleteIcon: {
        color: "#e53935",
        cursor: "pointer",
        fontSize: "18px",
    },

    totalBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
    },

    total: {
        color: "#2e7d32",
    },

    checkoutBtn: {
        width: "100%",
        padding: "15px",
        marginTop: "20px",
        border: "none",
        borderRadius: "35px",
        background: "linear-gradient(135deg,#43a047,#2e7d32)",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(46,125,50,0.3)",
    },
};

export default Cart;
