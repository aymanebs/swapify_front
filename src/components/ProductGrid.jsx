import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const products = [
    { name: 'Lorem', image: 'https://loremflickr.com/1280/720' },
    { name: 'Morel', image: 'https://loremflickr.com/1280/720' },
    { name: 'Volt', image: 'https://loremflickr.com/1280/720' },
    { name: 'Sart', image: 'https://loremflickr.com/1280/720' },
    { name: 'Bing', image: 'https://loremflickr.com/1280/720' },
    { name: 'Taipei', image: 'https://loremflickr.com/1280/720' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-28">Recent Items</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14 mt-5 mb-5">
          {products.map(prod => {
            return <ProductCard key={prod.name} product={prod} />;
          })}
        </div>
      </div>
    </section>
  );
}
