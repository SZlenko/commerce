import React from "react";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({ 
  selectedCategory, 
  selectedPriceRange, 
  selectedColors, 
  onCategoryChange, 
  onPriceRangeChange, 
  onColorChange 
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category 
        icons={false} 
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <Color 
        selectedColors={selectedColors}
        onColorChange={onColorChange}
      />
      <Price 
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={onPriceRangeChange}
      />
    </div>
  );
};

export default ShopSideNav;
