import React, { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";

function Items({ currentItems, layoutView }) {
  if (layoutView === 'list') {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item._id} className="w-full mb-6">
              <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover rounded-md" 
                    src={item.img} 
                    alt={item.productName} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.productName}
                  </h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {item.des}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primeColor mb-1">
                        ${item.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          // Add to cart functionality
                          console.log('Add to cart:', item.productName);
                        }}
                        className="px-4 py-2 bg-primeColor text-white rounded-md hover:bg-black transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => {
                          // Navigate to product details
                          const idString = String(item._id).toLowerCase().split(" ").join("");
                          window.location.href = `/product/${idString}`;
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:border-primeColor hover:text-primeColor transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  // Grid layout (default)
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, selectedCategory, selectedPriceRange, selectedColors, layoutView, sortBy }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Filter and sort items based on all selected filters and sort option
  const filteredItems = useMemo(() => {
    let filtered = paginationItems;

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Products') {
      const categoryKeywords = {
        'new arrivals': ['new', 'latest', 'arrival'],
        'gadgets': ['gadget', 'device', 'tech'],
        'accessories': ['watch', 'bag', 'cap', 'hat', 'belt', 'accessory'],
        'electronics': ['phone', 'laptop', 'computer', 'electronic', 'device', 'gadget'],
        'others': ['other', 'misc', 'various']
      };
      
      const keywords = categoryKeywords[selectedCategory.toLowerCase()] || [selectedCategory.toLowerCase()];
      filtered = filtered.filter((item) => {
        const productName = item.productName.toLowerCase();
        return keywords.some(keyword => productName.includes(keyword));
      });
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.price);
        return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      });
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((item) => {
        const itemColor = item.color.toLowerCase();
        return selectedColors.some(selectedColor => 
          itemColor.includes(selectedColor.toLowerCase())
        );
      });
    }

    // Sort items
    const sortedItems = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'Price: High to Low':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'Name: A to Z':
          return a.productName.localeCompare(b.productName);
        case 'Name: Z to A':
          return b.productName.localeCompare(a.productName);
        case 'New Arrival':
          // Sort by _id in descending order (assuming higher IDs are newer)
          return b._id - a._id;
        case 'Featured':
          // Sort by badge or priority (assuming items with badges are featured)
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return 0;
        case 'Final Offer':
          // Sort by price in ascending order (assuming lower prices are final offers)
          return parseFloat(a.price) - parseFloat(b.price);
        case 'Best Sellers':
        default:
          // Default sorting by _id (original order)
          return a._id - b._id;
      }
    });

    return sortedItems;
  }, [selectedCategory, selectedPriceRange, selectedColors, sortBy]);

  // Reset pagination when any filter or sort changes
  useEffect(() => {
    setItemOffset(0);
    setItemStart(1);
  }, [selectedCategory, selectedPriceRange, selectedColors, sortBy]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className={layoutView === 'list' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'}>
        <Items currentItems={currentItems} layoutView={layoutView} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {Math.min(endOffset, filteredItems.length)} of{" "}
          {filteredItems.length}
          {(selectedCategory || selectedPriceRange || selectedColors.length > 0) && (
            <span className="ml-2 text-primeColor font-semibold">
              (Filtered)
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
