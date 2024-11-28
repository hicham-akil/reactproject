import pic from '../img/girl.jpg';

function Header() {
  return (
    <>
      {/* Info Section */}
      <div className="info flex flex-wrap justify-center sm:justify-end items-center space-x-4 sm:space-x-2 py-4 px-4 overflow-x-hidden text-gray-800">
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-shipping-fast mr-1"></i> Livraison 48h
        </span>
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-box mr-1"></i> Colissimo
        </span>
        <span className="text-xs sm:text-sm flex items-center">
          <i className="fas fa-store mr-1"></i> Relais
        </span>
        <a href="#" className="flex items-center text-xs sm:text-sm hover:underline">
          <i className="fas fa-comment-dots mr-1"></i> Contact
        </a>
        <a href="tel:0980803535" className="flex items-center text-xs sm:text-sm hover:underline">
          <i className="fas fa-phone-alt mr-1"></i> 09 80 80 35 35
        </a>
      </div>

      {/* Search Section with Image Below */}
      <div className="cherche flex flex-col items-center mt-6">
        <p className="text-2xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">Cherchez le parapluie</p>
        <input
          type="text"
          className="border border-gray-400 rounded-lg p-3 w-64 sm:w-72 md:w-96 text-center"
          placeholder="Entrez votre recherche"
        />
        <div className="mt-6 relative right-1/4">
          <img
            src={pic}
            alt="Girl with umbrella"
            className="w-70 sm:w-96 md:w-[400px] lg:w-[500px] rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out border-4"
            />
     
        </div>
      </div>
    </>
  );
}

export default Header;
