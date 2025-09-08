import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { FaBell, FaShieldAlt, FaPalette, FaGlobe, FaLock, FaEye, FaEyeSlash, FaSave } from 'react-icons/fa';

const Settings = () => {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showEmail: false,
    showPhone: false,
    allowMarketing: false
  });

  // Password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword) {
      showError('Current password is required');
      return;
    }
    
    if (!passwordForm.newPassword) {
      showError('New password is required');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      showError('New password must be at least 6 characters long');
      return;
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('New passwords do not match');
      return;
    }
    
    // In a real app, this would make an API call
    showSuccess('Password updated successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    showSuccess('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would make an API call
      showError('Account deletion is not implemented in this demo');
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 py-6">
      <Breadcrumbs title="Settings" />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 px-4 py-2 bg-primeColor text-white rounded-md hover:bg-black transition-colors"
            >
              <FaSave />
              Save Settings
            </button>
          </div>

          <div className="space-y-8">
            {/* Notification Settings */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBell className="text-primeColor text-xl" />
                <h2 className="text-lg font-semibold text-gray-700">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-500">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'smsNotifications' && 'Receive notifications via SMS'}
                        {key === 'orderUpdates' && 'Get updates about your orders'}
                        {key === 'promotions' && 'Receive promotional offers and discounts'}
                        {key === 'securityAlerts' && 'Get alerts about account security'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange(key)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primeColor/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primeColor"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-primeColor text-xl" />
                <h2 className="text-lg font-semibold text-gray-700">Privacy Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-500">
                          {key === 'showEmail' && 'Allow others to see your email address'}
                          {key === 'showPhone' && 'Allow others to see your phone number'}
                          {key === 'allowMarketing' && 'Allow marketing communications'}
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primeColor/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primeColor"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Password Change */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-primeColor text-xl" />
                <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-primeColor text-white rounded-md hover:bg-black transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Danger Zone */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-red-500 text-xl" />
                <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
                <p className="text-sm text-red-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
