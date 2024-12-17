import React, { useState, useEffect, useRef } from "react";
import pic1 from "../img/depar.jpg";
import pic2 from "../img/manq.jpg";
import pic3 from "../img/PARA.jpg";

export const Aboutcomp = () => {
  const [isInView, setIsInView] = useState(false);
  const h1Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    if (h1Ref.current) {
      observer.observe(h1Ref.current);
    }

    return () => {
      if (h1Ref.current) {
        observer.unobserve(h1Ref.current);
      }
    };
  }, []);

  return (
    <div className="w-full p-12">
      <div className="relative group">
        <h1 ref={h1Ref} className="text-center text-black text-2xl font-semibold mb-10">
          BEST IN THE WORLD
        </h1>

        <span
          className={`absolute opacity-0 transition-all duration-500 transform left-0 top-1/2 translate-y-[-50%] ${
            isInView ? "opacity-100 translate-x-[180px]" : "opacity-0 translate-x-[-50px]"
          }`}
        >
          <i className="fas fa-arrow-right text-4xl text-blue-300"></i>
        </span>
      </div>

      <div style={{ height: "700px" }} className="flex flex-col lg:flex-row w-full rounded-2xl bg-gray-200 justify-between items-center gap-8">
        <div className="w-full lg:w-1/2 flex gap-4 justify-between m-5">
            
          <div className="w-full sm:w-full lg:w-1/3 bg-gray-100 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <img
              src={pic1}
              alt="Image 1"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          <div className="w-full  lg:w-1/3 bg-gray-100 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <img
              src={pic2}
              alt="Image 2"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          <div className="w-full  lg:w-1/3 bg-gray-100 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <img
              src={pic3}
              alt="Image 3"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        </div>

        <div className="info flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 m-6">
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="text-xl font-semibold">+199</div>
            <div className="text-gray-500">users</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="text-xl font-semibold">+5800</div>
            <div className="text-gray-500">daily shop</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="text-xl font-semibold">+1654</div>
            <div className="text-gray-500">now</div>
          </div>
        </div>
      </div>
    </div>
  );
};
