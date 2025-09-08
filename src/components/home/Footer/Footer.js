import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaTruck, FaUndo, FaHeadset } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#F5F5F3] py-12 md:py-20">
      <div className="max-w-container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <FooterListTitle title="Fashion Shop" />
            <div className="flex flex-col gap-4">
              <p className="text-sm text-lightText leading-relaxed">
                Discover the latest fashion trends and styles. We offer a curated collection of clothing, accessories, and more to help you express your unique style.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 bg-primeColor text-white hover:bg-black cursor-pointer text-sm rounded-full flex justify-center items-center transition-colors duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="w-8 h-8 bg-primeColor text-white hover:bg-black cursor-pointer text-sm rounded-full flex justify-center items-center transition-colors duration-300">
                  <FaYoutube />
                </a>
                <a href="#" className="w-8 h-8 bg-primeColor text-white hover:bg-black cursor-pointer text-sm rounded-full flex justify-center items-center transition-colors duration-300">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-8 h-8 bg-primeColor text-white hover:bg-black cursor-pointer text-sm rounded-full flex justify-center items-center transition-colors duration-300">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterListTitle title="Quick Links" />
            <ul className="flex flex-col gap-3">
              <Link to="/shop" className="font-titleFont text-sm text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 transition-colors duration-300">
                Shop All
              </Link>
              <Link to="/about" className="font-titleFont text-sm text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 transition-colors duration-300">
                About Us
              </Link>
              <Link to="/contact" className="font-titleFont text-sm text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 transition-colors duration-300">
                Contact
              </Link>
              <Link to="/offer" className="font-titleFont text-sm text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 transition-colors duration-300">
                Special Offers
              </Link>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <FooterListTitle title="Customer Service" />
            <ul className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaHeadset className="text-primeColor" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaTruck className="text-primeColor" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaUndo className="text-primeColor" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaShieldAlt className="text-primeColor" />
                <span>Secure Payment</span>
              </div>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <FooterListTitle title="Contact Info" />
            <ul className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaPhone className="text-primeColor" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-lightText">
                <FaEnvelope className="text-primeColor" />
                <span>support@fashionshop.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-lightText">
                <FaMapMarkerAlt className="text-primeColor mt-1" />
                <span>123 Fashion Street<br />New York, NY 10001</span>
              </div>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-300 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <FooterListTitle title="Stay Updated" />
            <p className="text-sm text-lightText mb-6">
              Subscribe to our newsletter for the latest fashion trends, exclusive offers, and style tips.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully!
              </motion.p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border border-gray-300 bg-white px-4 text-primeColor text-sm placeholder:text-gray-400 outline-none focus:border-primeColor transition-colors duration-300"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-xs font-semibold font-titleFont mt-1">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-primeColor text-white px-6 h-12 hover:bg-black transition-colors duration-300 text-sm font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <div className="text-center">
            <p className="text-sm text-lightText mb-4">We Accept</p>
            <Image
              className="w-[80%] max-w-md mx-auto opacity-70"
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
