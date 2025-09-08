import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
  setError,
  clearError,
} from "../../redux/orebiSlice";
import { useToast } from "../../hooks/useToast";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteItem = async () => {
    if (!item._id) {
      showError("Unable to remove item. Please try refreshing the page.");
      return;
    }

    setIsUpdating(true);
    dispatch(clearError());

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      dispatch(deleteItem(item._id));
      showSuccess(`${item.name} removed from cart`);
    } catch (error) {
      console.error('Error removing item:', error);
      showError("Failed to remove item. Please try again.");
      dispatch(setError("Failed to remove item"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!item._id) {
      showError("Unable to update quantity. Please try refreshing the page.");
      return;
    }

    if (item.quantity <= 1) {
      showError("Quantity cannot be less than 1. Use the delete button to remove the item.");
      return;
    }

    setIsUpdating(true);
    dispatch(clearError());

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      dispatch(decreaseQuantity({ _id: item._id }));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      showError("Failed to update quantity. Please try again.");
      dispatch(setError("Failed to update quantity"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!item._id) {
      showError("Unable to update quantity. Please try refreshing the page.");
      return;
    }

    setIsUpdating(true);
    dispatch(clearError());

    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      dispatch(increaseQuantity({ _id: item._id }));
    } catch (error) {
      console.error('Error increasing quantity:', error);
      showError("Failed to update quantity. Please try again.");
      dispatch(setError("Failed to update quantity"));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={handleDeleteItem}
          className={`duration-300 cursor-pointer ${
            isUpdating 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primeColor hover:text-red-500'
          }`}
        />
        <img className="w-32 h-32" src={item.image} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={handleDecreaseQuantity}
            className={`w-6 h-6 text-2xl flex items-center justify-center duration-300 border-[1px] ${
              isUpdating || item.quantity <= 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-gray-100 hover:bg-gray-300 cursor-pointer border-gray-300 hover:border-gray-300'
            }`}
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={handleIncreaseQuantity}
            className={`w-6 h-6 text-2xl flex items-center justify-center duration-300 border-[1px] ${
              isUpdating
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200'
                : 'bg-gray-100 hover:bg-gray-300 cursor-pointer border-gray-300 hover:border-gray-300'
            }`}
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
