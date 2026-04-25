
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FiChevronDown } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory || categoryParam)
        params.category = selectedCategory || categoryParam;
      if (sortBy) params.sort = sortBy;
      params.limit = 50;

      const { data } = await getProducts(params);
      setProducts(data.products);
      setTotalProducts(data.totalProducts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, categoryParam, sortBy]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const currentCatName = categories.find(
    (c) => c.id === parseInt(selectedCategory || categoryParam)
  )?.name;

  return (
    <div className="home">
      {/* Hero Banner */}
      {!searchQuery && !selectedCategory && !categoryParam && (
        <div className="home__hero">
          <div className="home__hero-overlay">
            <h1>Welcome to our Store</h1>
            <p>Great deals on millions of items. Fast delivery.</p>
          </div>
        </div>
      )}

      {/* Category Bar */}
      <div className="home__category-bar">
        <div className="home__category-chips">
          <button
            className={`home__category-chip ${
              !selectedCategory && !categoryParam
                ? 'home__category-chip--active'
                : ''
            }`}
            onClick={() => setSelectedCategory('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`home__category-chip ${
                parseInt(selectedCategory || categoryParam) === cat.id
                  ? 'home__category-chip--active'
                  : ''
              }`}
              onClick={() => setSelectedCategory(cat.id.toString())}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="home__content">
        {/* Results Header */}
        <div className="home__results-header">
          <div className="home__results-info">
            {searchQuery && (
              <span className="home__results-query">
                Results for "<strong>{searchQuery}</strong>"
              </span>
            )}
            {currentCatName && (
              <span className="home__results-query">
                Category: <strong>{currentCatName}</strong>
              </span>
            )}
            <span className="home__results-count">
              {totalProducts} result{totalProducts !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="home__sort">
            <label htmlFor="sort">Sort by: </label>
            <div className="home__sort-wrapper">
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="home__sort-select"
              >
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
              <FiChevronDown className="home__sort-icon" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="home__loading">
            <div className="home__spinner" />
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="home__empty">
            <h2>No products found</h2>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="home__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;