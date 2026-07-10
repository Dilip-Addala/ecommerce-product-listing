import { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/base/ProductGrid';
import EmptyState from '../components/base/EmptyState';

function FavoritesPage() {
  const { products, favorites } = useProducts();

  const favoriteProducts = useMemo(
    () => products.filter((p) => favorites.includes(p.id)),
    [products, favorites]
  );

  return (
    <div className="max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        My Favorites
        <span className="text-gray-400 font-medium text-lg ml-2">
          ({favoriteProducts.length})
        </span>
      </h2>
      {favoriteProducts.length === 0 ? (
        <EmptyState>
          No favorites yet. Click the heart on a product to add it!
        </EmptyState>
      ) : (
        <ProductGrid products={favoriteProducts} />
      )}
    </div>
  );
}

export default FavoritesPage;
