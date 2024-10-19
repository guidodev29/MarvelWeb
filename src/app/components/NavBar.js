'use client';
import Link from 'next/link';
import React from 'react';
import '../styles/globals.css';

const NavBar = () => {
  return (
    <nav className="bg-red-600 shadow-md w-full px-8">
      <div className="md:h-16 h-28 mx-auto container flex items-center justify-between flex-wrap md:flex-nowrap">
        
        {/* Logo de Marvel */}
        <div className="md:order-1">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" 
            alt="Marvel Logo" 
            className="h-16 w-auto object-contain" 
          />
        </div>

        {/* Menú de navegación */}
        <div className="text-white order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between space-x-4">
            <li className="md:px-4 md:py-2 hover:text-gray-300">
              <Link href="/">Characters</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-300">
              <Link href="/comics">Comics</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-300">
              <Link href="/creators">Creators</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-300">
              <Link href="/series">Series</Link>
            </li>
            <li className="md:px-4 md:py-2 hover:text-gray-300">
              <Link href="/stories">Stories</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
