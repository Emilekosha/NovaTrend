import React from "react";
import Hero from "../components/Hero.jsx";
import ProductList from "../components/ProductList.jsx";
export default function Home() {
  return (
    <div>
      <Hero />
      <ProductList limit={8} />
    </div>
  );
}

