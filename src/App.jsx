import { Routes, Route, NavLink } from 'react-router-dom';
import { useProducts } from './context/ProductContext';
import ProductListingPage from './pages/ProductListingPage';
import FavoritesPage from './pages/FavoritesPage';
import Badge from './components/base/Badge';

function App() {
  const { favorites } = useProducts();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f5f5f7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5 max-md:flex-col max-md:gap-3 max-md:items-start">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            ShopGrid
          </h1>
          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 no-underline ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 no-underline ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              Favorites
              {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
            </NavLink>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="pt-8 pb-16">
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
