import React, { useState, useEffect } from "react";
import { Grid, List } from "lucide-react";
import axios from "axios";

interface Product {
  id: number;
  attributes: {
    title: string;
    price: number | string;
    image: string;
    company: string;
    category: string;
    shipping: boolean;
  };
}

interface ApiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    company: "all",
    price: 100000,
    shipping: false,
  });
  const [sortBy, setSortBy] = useState("a-z");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://strapi-store-server.onrender.com/api/products"
        );
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(
          "An error occurred while fetching products. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (filters.search) {
      result = result.filter((product) =>
        product.attributes.title
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.attributes.category === filters.category
      );
    }
    if (filters.company !== "all") {
      result = result.filter(
        (product) => product.attributes.company === filters.company
      );
    }
    result = result.filter(
      (product) => Number(product.attributes.price) <= filters.price
    );
    if (filters.shipping) {
      result = result.filter((product) => product.attributes.shipping);
    }

    if (sortBy === "a-z") {
      result.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
    } else if (sortBy === "z-a") {
      result.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
    } else if (sortBy === "low-high") {
      result.sort(
        (a, b) => Number(a.attributes.price) - Number(b.attributes.price)
      );
    } else if (sortBy === "high-low") {
      result.sort(
        (a, b) => Number(b.attributes.price) - Number(a.attributes.price)
      );
    }

    setFilteredProducts(result);
  }, [filters, products, sortBy]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      company: "all",
      price: 100000,
      shipping: false,
    });
    setSortBy("a-z");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-sky-500">C</span>
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="/"
                className="text-neutral-600 hover:text-sky-500 transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-neutral-600 hover:text-sky-500 transition-colors"
              >
                About
              </a>
              <a
                href="/products"
                className="bg-sky-500 text-white rounded-md px-4 py-2 hover:bg-sky-600 transition-colors"
              >
                Products
              </a>
              <a
                href="/cart"
                className="text-neutral-600 hover:text-sky-500 transition-colors"
              >
                Cart
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-md p-6 mb-8">
          <h4 className="font-bold text-lg mb-4">Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Search Product
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Search..."
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Select Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Select Company
              </label>
              <select
                id="company"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">All</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Select Price
              </label>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="100000"
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full"
              />
              <span className="text-sm text-neutral-600">${filters.price}</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="shipping"
                name="shipping"
                checked={filters.shipping}
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label
                htmlFor="shipping"
                className="text-sm font-medium text-neutral-700"
              >
                Free Shipping
              </label>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-neutral-700">
              {filteredProducts.length} products found
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1 rounded ${
                  viewMode === "grid"
                    ? "bg-sky-500 text-white"
                    : "bg-neutral-200 text-neutral-700"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1 rounded ${
                  viewMode === "list"
                    ? "bg-sky-500 text-white"
                    : "bg-neutral-200 text-neutral-700"
                }`}
              >
                <List size={20} />
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="a-z">Name (A-Z)</option>
                <option value="z-a">Name (Z-A)</option>
                <option value="low-high">Price (Low to High)</option>
                <option value="high-low">Price (High to Low)</option>
              </select>
            </div>
          </div>
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                  className={`w-full ${
                    viewMode === "list"
                      ? "w-48 h-48 object-cover"
                      : "h-48 object-cover"
                  }`}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {product.attributes.title}
                  </h3>
                  <p className="text-sky-500 font-bold mt-2">
                    $
                    {typeof product.attributes.price === "number"
                      ? product.attributes.price.toFixed(2)
                      : Number(product.attributes.price).toFixed(2)}
                  </p>
                  {product.attributes.shipping && (
                    <span className="text-xs text-neutral-500 mt-1 block">
                      Free Shipping
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
