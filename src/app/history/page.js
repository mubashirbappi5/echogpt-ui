'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setHistory(savedHistory);
  }, []);
 
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center"> My Chat History</h1>
      <p className='text-center'>Access your complete chat history across diverse topics and interactions with different models or characters.</p>
      <Link href="/" className="text-blue-500 underline mb-4 inline-block">← Back to Chat</Link>
      
      {history.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow-lg md:w-5/12 mx-auto">
          {history.map((msg, index) => (
            <div key={index} className={`p-2 my-1 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300'}`}>
              {msg.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
