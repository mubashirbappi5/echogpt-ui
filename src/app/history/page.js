'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHistory } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <FaHistory className="mr-2" /> My Chat History
          </h1>
          <Link href="/" className="text-gray-400 hover:text-white flex items-center">
            <IoArrowBack className="mr-2" /> Back to Chat
          </Link>
        </div>

        <p className="text-gray-300 mt-2 text-center">
          Access your chat history across diverse topics and interactions.
        </p>

        {/* Chat History Display */}
        {history.length === 0 ? (
          <p className="text-gray-400 text-center mt-6">No chat history available.</p>
        ) : (
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg mt-6 max-h-96 overflow-y-auto">
            {history.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 my-2 rounded-lg shadow-md w-fit max-w-xs ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-600 text-white'
                }`}>
                {msg.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
