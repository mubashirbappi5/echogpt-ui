'use client';
import { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { sendMessageToEchoGPT } from '@/utils/api';
import Link from 'next/link';

export default function Sidebar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

  
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await sendMessageToEchoGPT(input);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error fetching response.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid md:grid-cols-12 h-screen'>
    <div className="flex flex-col md:col-span-2">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 h-full bg-gray-900 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">EcoGPT</h1>
        <nav className="flex flex-col space-y-3">
          <Link href="/" className="hover:bg-gray-700 p-2 rounded">Home</Link>
          <Link href="/history" className="hover:bg-gray-700 p-2 rounded">History</Link>
          <Link href="/services" className="hover:bg-gray-700 p-2 rounded">Services</Link>
          <Link href="/contact" className="hover:bg-gray-700 p-2 rounded">Contact</Link>
        </nav>
      </aside>

      {/* Navbar for small screens */}
      <nav className="md:hidden w-full bg-gray-900 text-white flex justify-between items-center p-4">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? '✖' : '☰'}
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-900 text-white p-5 space-y-4 z-50">
          <nav className="flex flex-col space-y-3 mt-10">
            <Link href="/" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/history" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>History</Link>
            <Link href="/services" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/contact" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </div>
    
    {/* Chat Section */}
    <main className="p-5 md:col-span-10  flex flex-col h-full mx-auto w-11/12">
      
    <div className="flex flex-col h-screen w-full p-5 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Chat Section</h1>
      <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto h-96">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500">Typing...</div>}
      </div>
      <div className="flex mt-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 p-2 border rounded-l"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          <IoSend />
        </button>
      </div>
    </div>
    </main>
  </div>
  );
}
