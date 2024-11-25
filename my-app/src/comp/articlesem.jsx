import { useState } from "react";
import thImage from '../img/OIF.jpg';

const items = [
  {
    p: "This is the first item.",
    src: thImage,
  },
  {
    p: "This is the second item.",
    src: thImage,
  },
  {
    p: "This is the third item.",
    src: thImage,
  },
  {
    p: "This is the fourth item.",
    src: thImage,
  },
];

export default function Sem() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <h1 className="font-bold text-center text-2xl ">article de la semaine</h1>
      <div className="flex justify-center items-center">
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5  mt-5 p-8 divw">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center ">
              <p className="text-lg text-center">{item.p}</p>
              <img
                src={item.src}
                alt={`Image for ${item.p}`}
                className="w-full max-w-xs h-32 object-cover rounded mt-2 transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
