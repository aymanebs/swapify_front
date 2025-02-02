import { useState } from "react";
import ProductCard from "./ProductCard";
import imagePlaceholder from './../assets/placeholder-image.jpg';

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" },
    { id: "dried", name: "Dried Foods" },
  ];

  const products =[
    {image: imagePlaceholder}
  ]

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-8 ">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent items</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          By choosing our products, you are not only getting good deals, but also the assurance of quality and safety.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}