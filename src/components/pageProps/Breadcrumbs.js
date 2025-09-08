import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight, HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title, productName }) => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(segment => segment !== "");
    const items = [];


    // Always start with Home
    items.push({
      name: "Home",
      path: "/",
      isActive: false,
      isClickable: true,
      icon: <HiHome className="w-4 h-4" />
    });

    // Build breadcrumb items based on current path
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let displayName = segment;
      
      // Customize display names for specific routes
      switch (segment) {
        case "shop":
          displayName = "Shop";
          break;
        case "about":
          displayName = "About";
          break;
        case "contact":
          displayName = "Contact";
          break;
        case "cart":
          displayName = "Shopping Cart";
          break;
        case "product":
          displayName = "Product";
          break;
        case "paymentgateway":
          displayName = "Checkout";
          break;
        case "signin":
          displayName = "Sign In";
          break;
        case "signup":
          displayName = "Sign Up";
          break;
        case "offer":
          displayName = "Special Offers";
          break;
        default:
          // Handle product IDs or other dynamic segments
          if (segment.match(/^[0-9a-fA-F]{24}$/) || segment.length > 10) {
            // Likely a product ID, use product name if provided
            displayName = productName || "Product Details";
          } else {
            // Capitalize first letter
            displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
          }
      }

      items.push({
        name: displayName,
        path: currentPath,
        isActive: isLast,
        isClickable: !isLast && segment !== "product" && !(segment.match(/^[0-9a-fA-F]{24}$/) || segment.length > 10) // Don't make product detail pages or product IDs clickable
      });
    });

    setBreadcrumbItems(items);
  }, [location.pathname, productName]);

  return (
    <div className="w-full py-6 xl:py-8">
      {/* Page Title */}
      {title && (
        <h1 className="text-4xl xl:text-5xl text-primeColor font-titleFont font-bold mb-4">
          {title}
        </h1>
      )}
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-1 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
              )}
              
              {item.isActive ? (
                <span className="flex items-center text-primeColor font-semibold">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span className="truncate max-w-[200px] sm:max-w-none">
                    {item.name}
                  </span>
                </span>
              ) : item.isClickable ? (
                <Link
                  to={item.path}
                  className="flex items-center text-lightText hover:text-primeColor transition-colors duration-200 group"
                >
                  {item.icon && <span className="mr-1 group-hover:scale-110 transition-transform duration-200">{item.icon}</span>}
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    {item.name}
                  </span>
                </Link>
              ) : (
                <span className="flex items-center text-lightText">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    {item.name}
                  </span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Optional: Add a subtle separator line */}
      <div className="mt-4 border-b border-gray-100"></div>
    </div>
  );
};

export default Breadcrumbs;
