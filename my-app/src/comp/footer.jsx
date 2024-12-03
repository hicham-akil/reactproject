export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Mon Site. Tous droits réservés.</p>
          <p className="text-sm">Fait avec ❤ par hciham akil</p>

          {/* Map Section */}
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.735232024259!2d-7.916667!3d34.033333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7867a4f1cb5b5%3A0xa47f2825!2sEl%20Jadida!5e0!3m2!1sen!2sma!4v1631031184848!5m2!1sen!2sma"
              width="100%" 
              height="300" 
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </footer>
    </>
  );
}
