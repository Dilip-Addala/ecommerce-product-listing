import { useProducts } from '../context/ProductContext';
import Button from './base/Button';
import Select from './base/Select';

function FilterSidebar() {
  const { filters, setFilters, categories } = useProducts();

  function handleChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters({ category: 'All', minRating: 0, sortPrice: 'none' });
  }

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_4px_12px_0_rgba(0,0,0,0.04)] border border-gray-100 sticky top-24 max-md:static max-md:flex max-md:flex-wrap max-md:gap-4 max-md:items-end">
      <div className="flex justify-between items-center mb-6 max-md:w-full max-md:mb-3">
        <h3 className="text-base font-bold text-gray-900">Filters</h3>
        <Button variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="max-md:flex-1 max-md:min-w-[140px]">
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      <div className="max-md:flex-1 max-md:min-w-[140px]">
        <Select
          label="Minimum Rating"
          value={filters.minRating}
          onChange={(e) => handleChange('minRating', Number(e.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={3}>3+ Stars</option>
          <option value={3.5}>3.5+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={4.5}>4.5+ Stars</option>
        </Select>
      </div>

      <div className="max-md:flex-1 max-md:min-w-[140px]">
        <Select
          label="Sort by Price"
          value={filters.sortPrice}
          onChange={(e) => handleChange('sortPrice', e.target.value)}
        >
          <option value="none">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>
      </div>
    </aside>
  );
}

export default FilterSidebar;
