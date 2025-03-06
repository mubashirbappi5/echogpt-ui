import Link from 'next/link';
import React from 'react';
import { FaEnvelope, FaHeadset, FaPhoneAlt } from 'react-icons/fa';

const Support = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 inline-block text-transparent bg-clip-text">
            Need Help? Contact Support
          </h1>
          <p className="text-gray-300 mb-8">
            We are here to assist you 24/7. Choose your preferred method to reach us.
          </p>
          
          {/* Back Button */}
          <Link href="/" className="text-blue-400 hover:text-blue-500 mb-6  flex justify-start">
            ← Back to Home
          </Link>
        </div>
  
        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Live Chat Support */}
          <div className="bg-gray-800 p-6 space-y-4 rounded-lg shadow-lg hover:shadow-blue-500 transition">
            <div className="flex items-center space-x-4">
              <FaHeadset className="text-4xl text-blue-400" />
              <h2 className="text-xl font-semibold">Live Chat</h2>
            </div>
            <p className="text-gray-400 mt-3">
              Connect with our agents instantly for real-time assistance.
            </p>
            <Link href={'/'} className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
              Start Chat
            </Link>
          </div>
  
          {/* Email Support */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500 transition">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-4xl text-yellow-400" />
              <h2 className="text-xl font-semibold">Email Support</h2>
            </div>
            <p className="text-gray-400 mt-3">
              Send us an email and well get back to you within 24 hours.
            </p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition">
              Send Email
            </button>
          </div>
  
          {/* Phone Support */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500 transition">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-4xl text-green-400" />
              <h2 className="text-xl font-semibold">Call Us</h2>
            </div>
            <p className="text-gray-400 mt-3">
              Talk to a support representative over the phone.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition">
              Call Now
            </button>
          </div>
        </div>
      </div>
    );
};

export default Support;