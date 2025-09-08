import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";

const ProductDetails = () => {
  const location = useLocation();
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    setProductInfo(location.state.item);
  }, [location]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="py-6">
          <Breadcrumbs 
            title={productInfo?.productName || "Product Details"} 
            productName={productInfo?.productName}
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 h-full pb-16 bg-gray-100 p-6 rounded-lg">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover rounded-lg shadow-md"
              src={productInfo.img}
              alt={productInfo.productName || "Product image"}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:px-8 xl:py-6 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
