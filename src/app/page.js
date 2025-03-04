'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <nav className="flex flex-col space-y-3">
          <Link href="/" className="hover:bg-gray-700 p-2 rounded">Home</Link>
          <Link href="/about" className="hover:bg-gray-700 p-2 rounded">About</Link>
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
          {/* <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-2xl">
            ✖
          </button> */}
          <nav className="flex flex-col space-y-3 mt-10">
            <Link href="/" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/services" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/contact" className="hover:bg-gray-700 p-2 rounded" onClick={() => setIsOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 p-5">
      
      </main>
    </div>
  );
}
