'use client';
import '../styles/globals.css';
import React from 'react';



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
      <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p className="text-[15px] leading-loose">© 2024 MARVEL. All rights reserved.</p>
        <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          <li>
            Data provided by <a href="http://marvel.com" target="_blank" rel="noopener noreferrer" className="text-[15px] hover:text-white">Marvel</a>
          </li>
          <li>
            <a href="https://github.com/guidodev29" className="text-[15px] hover:text-white">
              Contact Me
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
