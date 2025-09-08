import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" />
      
      {/* Hero Section */}
      <div className="pb-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-primeColor">Fashion Shop</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-lightText leading-relaxed">
            <span className="text-primeColor font-semibold text-xl">Fashion Shop</span>{" "}
            is your premier destination for the latest fashion trends and styles. We are 
            internationally recognized for celebrating the essence of modern fashion and 
            helping you express your unique style. We are committed to providing exceptional 
            clothing, accessories, and outstanding customer service to fashion enthusiasts worldwide.
          </p>
        </div>
        
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 mb-12">
            Continue Shopping
          </button>
        </Link>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lightText leading-relaxed">
            To provide high-quality fashion items that help our customers express their 
            unique style while maintaining the highest standards of customer service. We believe 
            in making trendy and fashionable clothing accessible to everyone, regardless of 
            their location or budget.
          </p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-lightText leading-relaxed">
            To become the world's most trusted fashion destination, known for our 
            trendy collections, exceptional customer experience, and commitment to 
            helping people discover and express their personal style.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primeColor rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">Q</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality</h3>
            <p className="text-lightText">
              We never compromise on quality. Every product in our catalog is carefully 
              selected and tested to meet our high standards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primeColor rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">C</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer First</h3>
            <p className="text-lightText">
              Our customers are at the heart of everything we do. We listen, learn, 
              and continuously improve based on your feedback.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primeColor rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">I</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-lightText">
              We embrace new technologies and innovative solutions to enhance your 
              shopping experience and bring you the latest products.
            </p>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="bg-primeColor text-white py-16 rounded-lg mb-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold mb-2">1M+</h3>
            <p className="text-lg">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">50K+</h3>
            <p className="text-lg">Products</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">100+</h3>
            <p className="text-lg">Countries</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">24/7</h3>
            <p className="text-lg">Support</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600 text-4xl font-bold">CEO</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
            <p className="text-primeColor font-medium mb-2">Chief Executive Officer</p>
            <p className="text-lightText text-sm">
              Leading Orebi with 15+ years of experience in ecommerce and retail innovation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600 text-4xl font-bold">CTO</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Michael Chen</h3>
            <p className="text-primeColor font-medium mb-2">Chief Technology Officer</p>
            <p className="text-lightText text-sm">
              Driving technological innovation and ensuring our platform delivers exceptional performance.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600 text-4xl font-bold">CMO</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Emily Rodriguez</h3>
            <p className="text-primeColor font-medium mb-2">Chief Marketing Officer</p>
            <p className="text-lightText text-sm">
              Building our brand presence and creating meaningful connections with our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gray-50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-lightText mb-8 max-w-2xl mx-auto">
          Have questions about our products or services? We'd love to hear from you. 
          Our customer support team is here to help you with any inquiries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <button className="w-48 h-12 bg-primeColor text-white hover:bg-black duration-300">
              Contact Us
            </button>
          </Link>
          <Link to="/shop">
            <button className="w-48 h-12 border-2 border-primeColor text-primeColor hover:bg-primeColor hover:text-white duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
