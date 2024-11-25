import { useState } from 'react';

function Nav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-black text-white py-4 relative">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="menu flex space-x-6 ">
            <a 
              href="#"
              className="hover:text-gray-400"
              onMouseEnter={() => setIsHovered(true)}  // Show .hov on hover
              onMouseLeave={() => setIsHovered(false)} // Hide .hov on mouse leave
            >
              Home
            </a>
            <a href="#" className="hover:text-gray-400">Products</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hover Content */}
      {isHovered && (
        <div className="bg-gray-500 hov mx-auto flex items-center justify-center w-full sm:w-1/2 px-4 py-2 overflow-x-hidden">
          <div className="text-center">
            <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, quibusdam?</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
