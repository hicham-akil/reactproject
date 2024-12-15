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
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/page1';
import About from './pages/page2';
import './index.css';  
import { Aboutcomp } from './comp/aboutcomp';
import DashboardStats from "./comp/DashboardStats";

// Protected Route for Admins
function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="maindiv">
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Nav />
              <Header />
              <Data />
              <Aboutcomp />
              <Sem />
              <Avis />
              <Footer />
            </>
          }
        />
        
     
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
        

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <>
                <Nav />              
                <DashboardStats />
              </>
            </AdminRoute>
          }
        />
        
     
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
        
        {/* Login Route */}
        <Route
          path="/login"
          element={<SignInForm />}
        />
        
        <Route
          path="/enregis"
          element={<SignUpForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
