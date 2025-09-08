import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Color = ({ selectedColors, onColorChange }) => {
  const [showColors, setShowColors] = useState(true);
  const colors = [
    {
      _id: 9001,
      title: "Green",
      base: "#22c55e",
    },
    {
      _id: 9002,
      title: "Gray",
      base: "#a3a3a3",
    },
    {
      _id: 9003,
      title: "Red",
      base: "#dc2626",
    },
    {
      _id: 9004,
      title: "Yellow",
      base: "#f59e0b",
    },
    {
      _id: 9005,
      title: "Blue",
      base: "#3b82f6",
    },
  ];

  const handleColorClick = (colorTitle) => {
    onColorChange(colorTitle);
  };

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((item) => {
              const isSelected = selectedColors.includes(item.title);
              
              return (
                <li
                  key={item._id}
                  className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer hover:text-primeColor transition-colors duration-200 ${
                    isSelected ? 'text-primeColor font-semibold' : ''
                  }`}
                  onClick={() => handleColorClick(item.title)}
                >
                  <span
                    style={{ background: item.base }}
                    className={`w-3 h-3 rounded-full border-2 ${
                      isSelected ? 'border-primeColor' : 'border-gray-300'
                    }`}
                  ></span>
                  {item.title}
                  {isSelected && (
                    <span className="ml-auto text-primeColor text-xs">✓</span>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
