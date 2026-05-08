import React, { useContext } from "react";

import { FaShoppingCart } from "react-icons/fa";

import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {

    const { addToCart } =
        useContext(CartContext);

    return (
        <div style={styles.card}>

            {/* DISCOUNT */}
            {product.discount && (
                <div style={styles.discount}>
                    -{product.discount}%
                </div>
            )}

            {/* IMAGE */}
            <img
                src={product.image}
                alt={product.name}
                style={styles.image}
            />

            {/* NAME */}
            <h3 style={styles.name}>
                {product.name}
            </h3>

            {/* DESCRIPTION */}
            <p style={styles.description}>
                {product.description}
            </p>

            {/* PRICE */}
            <div style={styles.priceBox}>

                <span style={styles.newPrice}>
                    {product.price
                        ? product.price.toLocaleString()
                        : 0}
                    đ
                </span>

                {product.oldPrice && (
                    <span style={styles.oldPrice}>
                        {product.oldPrice.toLocaleString()}
                        đ
                    </span>
                )}
            </div>

            {/* INFO */}
            <div style={styles.infoBox}>
                <span>
                    ⭐ {product.rating || 5.0}
                </span>

                <span>
                    Đã bán: {product.sold || 0}
                </span>
            </div>

            {/* BUTTON */}
            <button
                style={styles.button}
                onClick={() => addToCart(product)}
            >
                <FaShoppingCart />

                <span>
                    Thêm vào giỏ
                </span>
            </button>
        </div>
    );
};

const styles = {

    card: {
        background: "#fff",

        borderRadius: "20px",

        overflow: "hidden",

        padding: "18px",

        boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",

        transition: "0.3s",

        position: "relative",

        cursor: "pointer",
    },

    discount: {
        position: "absolute",

        top: "15px",
        left: "15px",

        background: "#e53935",

        color: "#fff",

        padding: "6px 12px",

        borderRadius: "20px",

        fontSize: "13px",

        fontWeight: "bold",
    },

    image: {
        width: "100%",

        height: "230px",

        objectFit: "cover",

        borderRadius: "15px",

        marginBottom: "15px",
    },

    name: {
        fontSize: "18px",

        color: "#333",

        marginBottom: "10px",

        minHeight: "45px",
    },

    description: {
        color: "#777",

        fontSize: "14px",

        marginBottom: "15px",

        minHeight: "40px",
    },

    priceBox: {
        display: "flex",

        alignItems: "center",

        gap: "10px",

        marginBottom: "15px",
    },

    newPrice: {
        color: "#e53935",

        fontSize: "24px",

        fontWeight: "bold",
    },

    oldPrice: {
        color: "#999",

        textDecoration: "line-through",

        fontSize: "15px",
    },

    infoBox: {
        display: "flex",

        justifyContent: "space-between",

        marginBottom: "18px",

        color: "#666",

        fontSize: "14px",
    },

    button: {
        width: "100%",

        padding: "13px",

        border: "none",

        borderRadius: "30px",

        background:
            "linear-gradient(135deg,#43a047,#2e7d32)",

        color: "#fff",

        fontWeight: "bold",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        gap: "10px",

        cursor: "pointer",

        fontSize: "15px",
    },
};

export default ProductCard;
