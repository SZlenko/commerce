import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [layoutView, setLayoutView] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('Best Sellers');
  const location = useLocation();

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleLayoutChange = (layout) => {
    setLayoutView(layout);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  useEffect(() => {
    // Check if we have category filter from navigation
    if (location.state && location.state.filterType === 'category') {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSelectedColors([]);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={selectedCategory ? `${selectedCategory} Products` : "Products"} />
      
      {/* Active Filters Display */}
      {(selectedCategory || selectedPriceRange || selectedColors.length > 0) && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Active Filters</h2>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="px-3 py-1 bg-primeColor text-white rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedPriceRange && (
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                    Price: ${selectedPriceRange.min} - ${selectedPriceRange.max}
                  </span>
                )}
                {selectedColors.map(color => (
                  <span key={color} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                    Color: {color}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav 
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            selectedColors={selectedColors}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onColorChange={handleColorChange}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner 
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            selectedCategory={selectedCategory}
            layoutView={layoutView}
            onLayoutChange={handleLayoutChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          <Pagination 
            itemsPerPage={itemsPerPage}
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            selectedColors={selectedColors}
            layoutView={layoutView}
            sortBy={sortBy}
          />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
