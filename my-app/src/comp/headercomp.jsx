import pic from '../img/girl.jpg';
import pic2 from '../img/OIP.jpg';
import pic3 from '../img/oop.jpg';

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
      </div>
      <div className="mt-6 w-full flex flex-col sm:flex-row  space-x-4">
  
  <img
    src={pic}
    alt="Girl with umbrella"
    className="w-[300px]  translate-x-[40px] sm:w-[350px] md:w-[400px] lg:w-[350px] rounded-lg shadow-lg border-4" style={{width:"900px",height:"500px"}}
  />
  
 
  <img
    src={pic2}
    alt="Girl with umbrella2"
    className="w-[400px] translate-x-[400px] sm:w-[550px] md:w-[600px] lg:w-[550px] rounded-lg shadow-lg border-4" style={{height:"250px"}}
  />
  <img
    src={pic3}
    alt="Girl with umbrella3"
    className="w-[400px] relative  translate-y-[250px]  sm:w-[550px] md:w-[600px] lg:w-[550px] rounded-lg shadow-lg border-4" style={{height:"250px", right:"130px"}}
  />
</div>

    </>
  );
}

export default Header;
