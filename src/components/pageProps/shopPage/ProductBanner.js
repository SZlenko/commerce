import React, { useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({ itemsPerPageFromBanner, layoutView, onLayoutChange, sortBy, onSortChange }) => {
  const handleGridViewClick = () => {
    onLayoutChange('grid');
  };

  const handleListViewClick = () => {
    onLayoutChange('list');
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* =========================================================
                            Left Part Start here
        ======================================================== */}

      <div className="flex items-center gap-4">
        <span
          onClick={handleGridViewClick}
          className={`${
            layoutView === 'grid'
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373] hover:border-primeColor hover:text-primeColor"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer transition-all duration-200`}
        >
          <BsGridFill />
        </span>
        <span
          onClick={handleListViewClick}
          className={`${
            layoutView === 'list'
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373] hover:border-primeColor hover:text-primeColor"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer transition-all duration-200`}
        >
          <ImList />
        </span>
      </div>
      {/* =========================================================
                            Left Part End here
        ======================================================== */}
      {/* =========================================================
                            Right Part STart here
        ======================================================== */}
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by:</label>
          <select
            onChange={handleSortChange}
            value={sortBy}
            id="sort"
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="Best Sellers">Best Sellers</option>
            <option value="New Arrival">New Arrival</option>
            <option value="Featured">Featured</option>
            <option value="Final Offer">Final Offer</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Name: A to Z">Name: A to Z</option>
            <option value="Name: Z to A">Name: Z to A</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label className="block">Show:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            id="countries"
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
      {/* =========================================================
                            Right Part End here
        ======================================================== */}
    </div>
  );
};

export default ProductBanner;
