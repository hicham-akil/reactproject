import { useState } from 'react';
import logoimg from '../img/logo.jpg'; // Importing the image


function Nav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Navigation bar */}
      <nav className="bg-black text-white py-4 relative " style={{top:"600px"}}>
      {/* <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-6 sm:py-4 relative " style={{left:"0%"}}>
                <div className="logobrand flex-shrink-0">
                    <img src={logoimg} alt="Logo" className="w-10 h-15 rounded-3xl sm:w-42" />
                </div> */}
             {/* </div> */}

        <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className='font-[Montserrat]'>Pluie <span className="text-blue-400">&</span> Style</h1>
          
          <div className="menu flex space-x-6 ">

          <a
        href="#"
        className="relative hover:text-gray-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Home
        <span
          className={`absolute left-0 top-0 h-1 w-full bg-blue-400 transition-transform duration-300 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </a>
      <a href="#" className="relative group hover:text-gray-400">
        Products
        <span className="absolute left-0 top-0 h-1 w-full bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </a>
      <a href="#" className="relative group hover:text-gray-400">
        About
        <span className="absolute left-0 top-0 h-1 w-full bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </a>
      <a href="#" className="relative group hover:text-gray-400">
        Contact
        <span className="absolute left-0 top-0 h-1 w-full bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </a>
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
