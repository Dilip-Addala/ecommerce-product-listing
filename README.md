# ShopGrid — E-Commerce Product Listing

A modern, responsive e-commerce product listing application built with **React 19** and **Tailwind CSS v4**. Designed as a clean, production-ready frontend that demonstrates component-driven architecture, client-side filtering, pagination, and state management patterns.

## Why This Project

This project serves as a reference implementation for building scalable product listing interfaces. It covers the core patterns found in real-world e-commerce frontends:

- Filtering and sorting products without a backend
- Client-side pagination with proper URL-independent state
- Favorites management persisted across sessions
- A reusable base component library to enforce UI consistency
- Responsive layout that works across desktop, tablet, and mobile

## Features

- **Product Listing** — Browse products in a responsive grid layout
- **Filtering** — Filter by category, minimum rating, and sort by price
- **Pagination** — Navigate through pages with numbered page controls and prev/next arrows
- **Favorites** — Toggle favorites with heart icons; persisted to `localStorage`
- **Responsive Design** — Sidebar collapses into a horizontal filter bar on mobile
- **Lazy Loading** — Product images load lazily with a shimmer placeholder and fade-in transition
- **Sticky Header** — Navigation stays visible while scrolling

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| [React](https://react.dev) | 19.x | UI library with hooks and Context API |
| [React DOM](https://react.dev) | 19.x | DOM renderer for React |
| [React Router DOM](https://reactrouter.com) | 7.x | Client-side routing (Products / Favorites pages) |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS framework |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite) | 4.x | Tailwind CSS integration for Vite |
| [Vite](https://vite.dev) | 6.x | Build tool and dev server |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 4.x | React Fast Refresh and JSX transform for Vite |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Yarn** (v1.x classic)

### Installation

```bash
# Clone the repository
git clone https://github.com/Dilip-Addala/ecommerce-product-listing.git
cd ecommerce-product-listing

# Install dependencies
yarn install
```

### Development

```bash
# Start the dev server
yarn dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

### Production Build

```bash
# Build for production
yarn build

# Preview the production build locally
yarn preview
```

## How to Use

1. **Browse Products** — The home page displays all products in a paginated grid.
2. **Filter** — Use the sidebar to filter by category, set a minimum star rating, or sort by price.
3. **Paginate** — Use the page numbers or arrow buttons at the bottom to navigate between pages.
4. **Favorite** — Click the heart icon on any product card to add it to your favorites.
5. **View Favorites** — Click "Favorites" in the navigation bar to see all your saved products.
6. **Persistence** — Favorites are saved to `localStorage` and survive page refreshes and browser restarts.

## Project Structure

```
src/
├── main.jsx                        # App entry point
├── App.jsx                         # Root layout (header, nav, routing)
├── index.css                       # Tailwind imports and theme config
│
├── components/
│   ├── base/                       # Reusable base UI components
│   │   ├── Badge.jsx               # Pill-shaped counter (e.g., favorites count)
│   │   ├── Button.jsx              # Button with variants: primary, ghost, icon
│   │   ├── EmptyState.jsx          # Centered empty message placeholder
│   │   ├── Pagination.jsx          # Page navigation with numbers and arrows
│   │   ├── ProductGrid.jsx         # Responsive grid layout for product cards
│   │   └── Select.jsx              # Labeled dropdown select input
│   │
│   ├── ProductCard.jsx             # Product display card with image, info, favorite toggle
│   └── FilterSidebar.jsx           # Sidebar with category, rating, and price filters
│
├── pages/
│   ├── ProductListingPage.jsx      # Main listing with filters, grid, and pagination
│   └── FavoritesPage.jsx           # Displays favorited products
│
├── context/
│   └── ProductContext.jsx           # Global state: products, favorites, filters
│
└── data/
    └── products.json                # Static product dataset (16 items)
```

## Component Architecture

The project follows a **layered component architecture** that separates concerns clearly:

### Base Components (`components/base/`)

Generic, reusable UI primitives with no business logic. These are the building blocks used across all features:

- **`Button`** — Accepts a `variant` prop (`primary`, `ghost`, `icon`) to render different button styles from a single component. Used for pagination, filter reset, favorite toggle, and load actions.
- **`Select`** — Combines a label and a styled `<select>` dropdown. Used three times in `FilterSidebar` to eliminate repeated markup.
- **`Badge`** — A small pill counter displayed in the navigation for favorites count.
- **`EmptyState`** — A centered message shown when there are no results. Used in both the listing page and favorites page.
- **`ProductGrid`** — A responsive CSS Grid wrapper that renders a list of `ProductCard` components. Used in both pages to avoid duplicating grid layout logic.
- **`Pagination`** — Page navigation with numbered buttons, ellipsis for large page ranges, and prev/next arrows. Fully controlled via props.

### Feature Components (`components/`)

Domain-specific components that compose base components with business logic:

- **`ProductCard`** — Renders a single product with image (lazy-loaded with shimmer placeholder), category, name, price, star rating, and a favorite toggle button. Manages its own image loading state.
- **`FilterSidebar`** — Composes three `Select` components and a `Button` for resetting filters. Reads and writes filter state from context.

### Pages (`pages/`)

Route-level components that orchestrate feature components:

- **`ProductListingPage`** — Combines `FilterSidebar`, `ProductGrid`, and `Pagination`. Handles filtering logic (`useMemo`), pagination math, and scroll-to-top on page change.
- **`FavoritesPage`** — Filters the product list to only favorited items and renders them in a `ProductGrid`.

### State Management (`context/`)

- **`ProductContext`** — A single React Context that provides products, favorites, filters, and their setters to the entire app. Favorites use `useReducer` for predictable state transitions and sync to `localStorage` via `useEffect`.

### Data Flow

```
ProductContext (global state)
    ├── products[]        ← loaded from products.json
    ├── favorites[]       ← useReducer + localStorage
    ├── filters{}         ← useState
    │
    ├── ProductListingPage
    │   ├── FilterSidebar  →  writes to filters
    │   ├── ProductGrid    →  reads filtered + paginated products
    │   │   └── ProductCard  →  reads isFavorite, calls toggleFavorite
    │   └── Pagination     →  controls page state
    │
    └── FavoritesPage
        └── ProductGrid    →  reads favorites-filtered products
            └── ProductCard
```

## License

This project is open source and available under the [MIT License](LICENSE).
