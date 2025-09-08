import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { FaEye, FaDownload, FaTruck, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';

const Orders = () => {
  const { user } = useAuth();
  
  // Mock order data - in a real app, this would come from an API
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { name: 'Phone Case', quantity: 2, price: 50.00 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 149.99,
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 149.99 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 89.99,
      items: [
        { name: 'USB Cable', quantity: 3, price: 29.97 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'shipped':
        return <FaTruck className="text-blue-500" />;
      case 'processing':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <Breadcrumbs title="My Orders" />
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <div className="text-sm text-gray-600">
              Welcome back, {user?.name}!
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <FaTruck />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button className="px-6 py-3 bg-primeColor text-white rounded-md hover:bg-black transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Order Date</div>
                      <div className="font-medium">{formatDate(order.date)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Items Ordered</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                      <div className="text-sm text-gray-600">
                        {order.shippingAddress}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Order Total</h4>
                      <div className="text-2xl font-bold text-primeColor">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total: ${order.total.toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 text-primeColor border border-primeColor rounded-md hover:bg-primeColor hover:text-white transition-colors">
                        <FaEye />
                        View Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                        <FaDownload />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Statistics */}
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primeColor">{orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-500">
                  {orders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {orders.filter(o => o.status === 'shipped').length}
                </div>
                <div className="text-sm text-gray-600">Shipped</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primeColor">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
