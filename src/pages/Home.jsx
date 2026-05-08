import React from "react";

import products from "../data/mockProduct";

import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div style={styles.page}>

      <div style={styles.banner}>

        <div>
          <h1 style={styles.title}>
            HEALTHY FRUIT SHOP 🍍
          </h1>

          <p style={styles.text}>
            Trái cây sấy healthy thơm ngon
          </p>
        </div>
      </div>
      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
  },

  banner: {
    height: "300px",
    borderRadius: "20px",
    marginBottom: "40px",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "white",
  },
  title: {
    fontSize: "50px",
  },

  text: {
    textAlign: "center",
    fontSize: "20px",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "25px",
  },
};

export default Home;
