import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
      <img
        src={product.image}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <h2 className="text-2xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {product.title}
        </h2>
        <Link href="/products">
        <button className="w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20">
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        </Link>
      </div>
    </div>
  );
}