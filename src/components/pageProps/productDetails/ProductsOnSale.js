import React from "react";
import { useNavigate } from "react-router-dom";
import { SplOfferData } from "../../../constants";

const ProductsOnSale = () => {
  const navigate = useNavigate();

  const handleProductClick = (item) => {
    // Create URL-friendly ID from product name (same logic as in Product.js)
    const idString = (id) => {
      return String(id).toLowerCase().split(" ").join("");
    };
    const rootId = idString(item._id);
    
    navigate(`/product/${rootId}`, {
      state: {
        item: item,
      },
    });
  };

  return (
    <div className="p-4">
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-3">
        {SplOfferData.map((item) => (
          <div
            key={item._id}
            onClick={() => handleProductClick(item)}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-md px-3 -mx-3"
          >
            <div>
              <img className="w-24 h-24 object-cover rounded-md" src={item.img} alt={item.productName} />
            </div>
            <div className="flex flex-col gap-1 font-titleFont">
              <p className="text-base font-medium hover:text-primeColor transition-colors duration-200">
                {item.productName}
              </p>
              <p className="text-sm font-semibold text-primeColor">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
