import { useState } from "react";
import thImage from '../img/OIF.jpg';

const items = [
  { p: "This is the first item.", src: thImage },
  { p: "This is the second item.", src: thImage },
  { p: "This is the third item.", src: thImage },
  { p: "This is the fourth item.", src: thImage },
];

export default function Sem() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Coming Soon
      </h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl px-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center transform hover:scale-105"
            >
              <img
                src={item.src}
                alt={`Image for ${item.p}`}
                className="w-full h-48 object-cover rounded mb-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <p className="text-lg text-gray-700 mb-2 text-center">{item.p}</p>
              <p className="text-xl font-semibold">
                Prix: <span className="text-red-500">Exceptionnel</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
