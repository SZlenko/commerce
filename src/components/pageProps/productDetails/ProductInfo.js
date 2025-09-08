import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, setError, clearError } from "../../../redux/orebiSlice";
import { useToast } from "../../../hooks/useToast";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!productInfo || !productInfo._id) {
      showError("Product information is missing. Please try refreshing the page.");
      return;
    }

    setIsAdding(true);
    dispatch(clearError());

    try {
      // Simulate potential async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(
        addToCart({
          _id: productInfo._id,
          name: productInfo.productName,
          quantity: 1,
          image: productInfo.img,
          badge: productInfo.badge,
          price: productInfo.price,
          colors: productInfo.color,
        })
      );
      
      showSuccess(`${productInfo.productName} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError("Failed to add item to cart. Please try again.");
      dispatch(setError("Failed to add item to cart"));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold text-gray-800">{productInfo.productName}</h2>
        <p className="text-2xl font-bold text-primeColor">${productInfo.price}</p>
      </div>
      
      <div className="space-y-3">
        <p className="text-base text-gray-600 leading-relaxed">{productInfo.des}</p>
        <p className="text-sm text-gray-500">Be the first to leave a review.</p>
        <p className="font-medium text-lg">
          <span className="font-normal text-gray-600">Colors:</span> {productInfo.color}
        </p>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full py-4 duration-300 text-white text-lg font-titleFont rounded-md ${
          isAdding 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-primeColor hover:bg-black'
        }`}
      >
        {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="font-normal text-sm text-gray-500">
          <span className="text-base font-medium text-gray-700">Categories:</span> Spring
          collection, Streetwear, Women Tags: featured SKU: N/A
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
