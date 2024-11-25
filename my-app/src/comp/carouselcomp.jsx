import { useState } from "react";

const images = [
  'https://www.francebleu.fr/s3/cruiser-production/2021/06/4e58157a-4656-4afe-9d73-4f8916df5f4b/560x315_le_parapluie.jpg',
  'https://i.ytimg.com/vi/QLTfX0W1Pa4/hq720.jpg',
  'https://static-images.lpnt.fr/cd-cw809/images/2023/09/25/25178316lpw-25178398-mega-une-jpg_9791568.jpg'
];

const Slider = () => {
    const [currentIndex, setIndex] = useState(0); 

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative w-full carousel"> 
            <div className="overflow-hidden rounded-lg h-full"> {/* Ensure child takes full height */}
                <img
                    src={images[currentIndex]} 
                    alt={`Slide ${currentIndex + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out" // Ensure the image covers the full height
                />
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
            >
                &#10094; {/* Left Arrow */}
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full focus:outline-none"
            >
                &#10095; {/* Right Arrow */}
            </button>

            {/* Dots for navigation */}
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => setIndex(index)} 
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
