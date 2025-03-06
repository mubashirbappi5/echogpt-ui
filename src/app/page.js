'use client';
import { useState, useEffect } from 'react';
import { IoSend, IoHome, IoChatbox, IoSettings, IoMenu, IoClose } from "react-icons/io5";
import { FaHistory, FaServicestack, FaPhoneAlt, FaDiscord } from "react-icons/fa";
import { sendMessageToEchoGPT } from '@/utils/api';
import Link from 'next/link';

export default function Sidebar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);

  // Load chat history on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const saveHistory = (newMessages) => {
    localStorage.setItem('chatHistory', JSON.stringify(newMessages));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await sendMessageToEchoGPT(input);
      const updatedMessages = [...newMessages, { text: botResponse, sender: 'bot' }];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
    } catch (error) {
      const errorMessage = { text: "Error fetching response.", sender: 'bot' };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid md:grid-cols-12 bg-gradient-to-r from-gray-900 to-gray-700 text-white'>
      {/* Sidebar for larger screens */}
      <aside className="hidden col-span-2  md:flex flex-col w-64 h-full bg-gray-900 p-5 space-y-6 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center">
          <IoChatbox className="mr-2" /> EcoGPT
        </h1>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
            <IoHome className="mr-2" /> Home
          </Link>
          <Link href="/history" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
            <FaHistory className="mr-2" /> History
          </Link>
          <Link href="/support" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
            <FaServicestack className="mr-2" /> Support
          </Link>
          <a href="https://discord.com/invite/JG8SXMtaeH" className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              <FaDiscord  className="mr-2 text-blue-400" />Discord
            </a>
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <nav className="md:hidden w-full bg-gray-900 flex justify-between items-center p-4">
        <h1 className="text-lg font-bold flex items-center">
          <IoChatbox className="mr-2" /> EcoGPT
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-900 p-5 space-y-6 z-50">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              <IoHome className="mr-2" /> Home
            </Link>
            <Link href="/history" className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              <FaHistory className="mr-2" /> History
            </Link>
            <Link href="/support" className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              <FaServicestack className="mr-2" /> Support
            </Link>
            <a href="https://discord.com/invite/JG8SXMtaeH" className="flex items-center p-3 hover:bg-gray-700 rounded-lg" onClick={() => setIsOpen(false)}>
              <FaDiscord className="mr-2 text-blue-400" />Discord
            </a>
          </nav>
        </div>
      )}

      {/* Chat Section */}
      <main className="p-5 md:col-span-10 flex flex-col h-full mx-auto w-10/12">
        <div className="flex flex-col h-screen w-full bg-gray-800 p-5 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4 text-center">💬 Chat with EcoGPT</h1>
          <div className="flex-1 bg-gray-900 p-4 rounded-lg shadow-lg overflow-y-auto h-96">
            {messages.map((msg, index) => (
              <div key={index} className={`p-3 my-2 rounded-lg shadow-md w-fit max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-600 text-white'
              }`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 animate-pulse">Typing...</div>}
          </div>
          <div className="flex mt-4 bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-700">
  {/* Input Field */}
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 p-3 bg-gray-900 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
  />

  {/* Send Button */}
  <button 
    onClick={sendMessage} 
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-r-lg flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-blue-500">
    <IoSend className="text-xl" />
  </button>
</div>
        </div>
      </main>
    </div>
  );
}
