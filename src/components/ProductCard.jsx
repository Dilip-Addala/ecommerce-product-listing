import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Button from "./base/Button";

function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useProducts();
  const [imgStatus, setImgStatus] = useState("loading");
  const favorited = isFavorite(product.id);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${
        favorited
          ? "ring-2 ring-danger/60 shadow-lg shadow-danger/10"
          : "shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_4px_12px_0_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.1),0_8px_32px_0_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
        {imgStatus === "loading" && (
          <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]" />
        )}
        {imgStatus === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
            No image
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imgStatus === "loaded"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          loading="lazy"
          onLoad={() => setImgStatus("loaded")}
          onError={() => setImgStatus("error")}
        />
        <Button
          variant="icon"
          className={`absolute top-3 right-3 w-9 h-9 text-lg shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 ${
            favorited
              ? "text-danger bg-white"
              : "text-gray-400 bg-white/80 hover:bg-white hover:text-danger"
          }`}
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {favorited ? "\u2665" : "\u2661"}
        </Button>
      </div>
      <div className="p-4">
        <span className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold mt-1 mb-3 leading-snug text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-star">
              {"\u2605".repeat(Math.floor(product.rating))}
              {"\u2606".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-[0.7rem] font-medium text-gray-400">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
