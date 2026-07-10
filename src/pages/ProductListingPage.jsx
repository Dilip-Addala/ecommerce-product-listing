import { useMemo, useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/base/ProductGrid';
import EmptyState from '../components/base/EmptyState';
import Pagination from '../components/base/Pagination';

const ITEMS_PER_PAGE = 8;

function ProductListingPage() {
  const { products, loading, filters } = useProducts();
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'All') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.sortPrice === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortPrice === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [filters]);

  function handlePageChange(newPage) {
    setPage(newPage);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[260px_1fr] gap-8 items-start max-md:grid-cols-1">
      <FilterSidebar />
      <div>
        <p className="text-sm text-gray-400 mb-5 font-medium">
          Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filteredProducts.length)} of{' '}
          {filteredProducts.length} products
        </p>
        {filteredProducts.length === 0 ? (
          <EmptyState>No products match your filters.</EmptyState>
        ) : (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductListingPage;
