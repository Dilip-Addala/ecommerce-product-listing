import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import productsData from '../data/products.json';

const ProductContext = createContext(null);

const FAVORITES_KEY = 'ecommerce-favorites';

function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((fid) => fid !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, dispatch] = useReducer(favoritesReducer, null, loadFavorites);
  const [filters, setFilters] = useState({
    category: 'All',
    minRating: 0,
    sortPrice: 'none',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  const isFavorite = (id) => favorites.includes(id);

  const categories = ['All', ...new Set(productsData.map((p) => p.category))];

  return (
    <ProductContext value={{
      products,
      loading,
      favorites,
      toggleFavorite,
      isFavorite,
      filters,
      setFilters,
      categories,
    }}>
      {children}
    </ProductContext>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}
