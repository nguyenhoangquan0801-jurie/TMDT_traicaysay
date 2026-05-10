import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';


const CheckoutPage = () => {
    const { cart, checkout } = useContext(CartContext);
    const navigate = useNavigate();
    const MAX_QTY = 15;

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const [message, setMessage] = useState({
        text: "",
        type: "" // "success" | "error"
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const handleCheckout = () => {
        const totalQty = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        //  CHƯA CÓ SẢN PHẨM
        if (cart.length === 0) {
            setMessage({
                text: " Chưa có sản phẩm trong giỏ hàng!",
                type: "error"
            });
            return;
        }

        //  QUÁ SỐ LƯỢNG
        if (totalQty > 15) {
            setMessage({
                text: "  Quá 15 sản phẩm. Không thể thanh toán!",
                type: "error"
            });
            return;
        }

        //  THÀNH CÔNG
        checkout();

        setMessage({
            text: "🎉 Thanh toán thành công!",
            type: "success"
        });

        setTimeout(() => {
            setMessage({ text: "", type: "" });
        }, 3000);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>

                {/* LEFT */}
                <div style={styles.left}>

                    <h1 style={styles.title}> Thanh toán</h1>

                    {message.text && (
                        <div
                            style={{
                                ...styles.toast,
                                background:
                                    message.type === "success"
                                        ? "#43a047"
                                        : "#e53935"
                            }}
                        >
                            {message.text}
                        </div>
                    )}

                    <div style={styles.formCard}>
                        <h3 style={styles.subTitle}>
                            Thông tin người nhận
                        </h3>

                        <input
                            name="name"
                            placeholder="Nhập họ tên..."
                            value={form.name}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="phone"
                            placeholder="Nhập số điện thoại..."
                            value={form.phone}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="address"
                            placeholder="Nhập địa chỉ..."
                            value={form.address}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            style={styles.checkoutBtn}
                            onClick={handleCheckout}
                        >
                             Xác nhận thanh toán
                        </button>

                        <button
                            style={styles.backBtn}
                            onClick={() => navigate("/")}
                        >
                            ⬅ Quay về trang chủ
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div style={styles.right}>
                    <h2 style={styles.orderTitle}>
                         Đơn hàng của bạn
                    </h2>

                    {cart.length === 0 ? (
                        <div style={styles.emptyCart}>
                            Chưa có sản phẩm
                        </div>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    style={styles.productCard}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={styles.productImage}
                                    />

                                    <div>
                                        <h4 style={{ margin: 0 }}>
                                            {item.name}
                                        </h4>

                                        <p style={styles.qty}>
                                            Số lượng: {item.qty}
                                        </p>

                                        <p style={styles.price}>
                                            {(
                                                item.price * item.qty
                                            ).toLocaleString()} đ
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div style={styles.totalBox}>
                                <span>Tổng tiền</span>

                                <span>
                                    {total.toLocaleString()} đ
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
const styles = {
    page: {
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "40px 20px",
    },

    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
    },

    left: {
        background: "#fff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    },

    right: {
        background: "#fff",
        padding: "35px",
        borderRadius: "20px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    },

    title: {
        marginBottom: "25px",
        color: "#2e7d32",
        fontSize: "32px",
    },

    subTitle: {
        marginBottom: "20px",
        color: "#333",
    },

    orderTitle: {
        marginBottom: "25px",
        color: "#2e7d32",
    },

    formCard: {
        marginBottom: "25px",
    },

    input: {
        display: "block",
        width: "100%",
        padding: "14px",
        marginBottom: "18px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        outline: "none",
        fontSize: "15px",
        transition: "0.3s",
        boxSizing: "border-box",
    },

    buttonGroup: {
        display: "flex",
        gap: "15px",
        marginTop: "20px",
    },

    checkoutBtn: {
        flex: 1,
        padding: "15px",
        background:
            "linear-gradient(135deg,#43a047,#2e7d32)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontWeight: "bold",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: "0 5px 15px rgba(67,160,71,0.3)",
        transition: "0.3s",
    },

    backBtn: {
        flex: 1,
        padding: "15px",
        background: "#f5f5f5",
        color: "#333",
        border: "1px solid #ddd",
        borderRadius: "12px",
        fontWeight: "bold",
        cursor: "pointer",
    },

    productCard: {
        display: "flex",
        gap: "15px",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "15px",
        background: "#fafafa",
        alignItems: "center",
    },

    productImage: {
        width: "90px",
        height: "90px",
        objectFit: "cover",
        borderRadius: "12px",
    },

    qty: {
        margin: "6px 0",
        color: "#666",
    },

    price: {
        margin: 0,
        color: "#2e7d32",
        fontWeight: "bold",
        fontSize: "18px",
    },

    totalBox: {
        marginTop: "25px",
        paddingTop: "20px",
        borderTop: "2px dashed #ddd",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "22px",
        fontWeight: "bold",
        color: "#2e7d32",
    },

    emptyCart: {
        background: "#fafafa",
        padding: "40px",
        textAlign: "center",
        borderRadius: "15px",
        color: "#888",
        fontSize: "18px",
    },

    toast: {
        color: "white",
        padding: "14px",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "bold",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
};
export default CheckoutPage;
