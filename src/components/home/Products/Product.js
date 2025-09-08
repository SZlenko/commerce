import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setError, clearError } from "../../../redux/orebiSlice";
import { useToast } from "../../../hooks/useToast";

const Product = (props) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  
  const _id = props._id;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  
  const handleProductDetails = () => {
    if (!props._id || !props.productName) {
      showError("Product information is incomplete. Please try again.");
      return;
    }
    
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };



  const handleAddToCart = async () => {
    if (!props._id || !props.productName) {
      showError("Product information is missing. Please try refreshing the page.");
      return;
    }

    setIsAdding(true);
    dispatch(clearError());

    try {
      // Simulate potential async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      dispatch(
        addToCart({
          _id: props._id,
          name: props.productName,
          quantity: 1,
          image: props.img,
          badge: props.badge,
          price: props.price,
          colors: props.color,
        })
      );
      
      showSuccess(`${props.productName} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError("Failed to add item to cart. Please try again.");
      dispatch(setError("Failed to add item to cart"));
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={handleAddToCart}
              className={`text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full ${
                isAdding ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
