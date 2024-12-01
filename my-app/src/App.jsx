import Header from './comp/headercomp';
import Nav from './comp/navbar';
import Slider from './comp/carouselcomp';
import Footer from './comp/footer';
import SignInForm from './comp/signin';
import SignUpForm from './comp/signup';
import Sem from './comp/articlesem';
import Avis from './comp/clientavis';
import Data from './comp/compelementdata';
import Achter from './comp/achtercomp';
import PaymentPage from './comp/paycomp';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/page1';
import About from './pages/page2';
import './index.css';  // Import the CSS where you included Tailwind directives

function App() {
  return (
    <div className="maindiv">
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Header />
              {/* <Slider /> */}
              <Data />
              <Sem />
              <Avis />
              <Footer />
            </>
          }
        />
        
        {/* About Page Route */}
        <Route
          path="/about"
          element={
            <>
              <Nav />
              <Header />
              <div className="about-content">
                <h2>About Us</h2>
                <p>Here you can add details about your company or website.</p>
              </div>
              <Footer />
            </>
          }
        />
        
        {/* Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"
          element={
            <>
              <Nav />
              <Header />
              {/* <AdminDashboard />  Admin Dashboard page for admins */}
              <Footer />
            </>
          }
        />
        
        {/* Item Details Page Route */}
        <Route
          path="/item/:Id/price/:price/image/:image"
          element={
            <>
              <Nav />
              <Achter />
              <Footer />
            </>
          }
        />
        
        {/* Payment Page Route */}
        <Route
          path="/payment"
          element={
            <>
              <Nav />
              <PaymentPage />
              <Footer />
            </>
          }
        />
        

        <Route
          path="/login"
          element={
            <>
              <SignInForm />
            </>
          }
        />


        <Route
          path="/enregis"
          element={
            <>
              <SignUpForm />
            </>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
