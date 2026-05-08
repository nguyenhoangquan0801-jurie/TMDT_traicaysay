import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


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

        // ❌ CHƯA CÓ SẢN PHẨM
        if (cart.length === 0) {
            setMessage({
                text: "❌ Chưa có sản phẩm trong giỏ hàng!",
                type: "error"
            });
            return;
        }

        // ❌ QUÁ SỐ LƯỢNG
        if (totalQty > 15) {
            setMessage({
                text: "❌ Không thể thanh toán! Quá 15 sản phẩm.",
                type: "error"
            });
            return;
        }

        // ✅ THÀNH CÔNG
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
        <div style={{ padding: "20px" }}>
            <h2>🧾 Thanh toán</h2>
            {message.text && (
                <div
                    style={{
                        ...styles.toast,
                        background:
                            message.type === "success"
                                ? "#4caf50"
                                : "#f44336"
                    }}
                >
                    {message.text}
                </div>
            )}

            <div style={styles.form}>
                <h3>Thông tin người nhận</h3>

                <input
                    name="name"
                    placeholder="Họ tên"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="phone"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    name="address"
                    placeholder="Địa chỉ"
                    value={form.address}
                    onChange={handleChange}
                    style={styles.input}
                />
            </div>

            {cart.length === 0 ? (
                <p>Chưa có sản phẩm</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id}>
                            {item.name} - {item.qty}
                        </div>
                    ))}

                    <hr />
                    <h3>Tổng tiền: {total.toLocaleString()} đ</h3>

                </>
            )}

            <div style={styles.buttonGroup}>
                <button style={styles.checkoutBtn} onClick={handleCheckout}>
                    🧾 Xác nhận thanh toán
                </button>

                <button
                    style={styles.backBtn}
                    onClick={() => navigate("/")}
                >
                    ⬅ Quay về trang chủ
                </button>


            </div>


        </div>


    );
};
const styles = {
    input: {
        display: "block",
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },

    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        marginTop: "20px",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",

    },

    checkoutBtn: {
        flex: 1,
        padding: "12px",
        background:  "linear-gradient(135deg,#43a047,#2e7d32)",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 3px 10px rgba(255, 82, 0, 0.3)",
    },

    backBtn: {
        flex: 1,
        padding: "12px",
        background: "#f1f1f1",
        color: "#333",
        border: "1px solid #ddd",
        borderRadius: "10px",
        cursor: "pointer",
    },

    toast: {
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        marginBottom: "15px",
        textAlign: "center",
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }
}

export default CheckoutPage;
