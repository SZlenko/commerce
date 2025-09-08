import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    zipCode: user?.zipCode || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      showError('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      showError('Email is required');
      return;
    }

    updateProfile(formData);
    setIsEditing(false);
    showSuccess('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
      zipCode: user?.zipCode || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <Breadcrumbs title="Profile" />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primeColor text-white rounded-md hover:bg-black transition-colors"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <FaSave />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <FaUser className="text-primeColor" />
                    {user?.name || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <FaEnvelope className="text-primeColor" />
                    {user?.email || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <FaPhone className="text-primeColor" />
                    {user?.phone || 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Address Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-800">
                    <FaMapMarkerAlt className="text-primeColor" />
                    {user?.address || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                    />
                  ) : (
                    <div className="text-gray-800">{user?.city || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                    />
                  ) : (
                    <div className="text-gray-800">{user?.country || 'Not provided'}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">ZIP Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  />
                ) : (
                  <div className="text-gray-800">{user?.zipCode || 'Not provided'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primeColor">0</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primeColor">$0.00</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primeColor">0</div>
                <div className="text-sm text-gray-600">Items in Cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
