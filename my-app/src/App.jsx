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
// import AdminDashboard from './comp/AdminDashboard'; // Import the AdminDashboard component
import { Routes, Route } from 'react-router-dom';
import Home from './pages/page1';
import About from './pages/page2';
// index.js or App.js
import './index.css';  // Import the CSS where you included Tailwind directives

// import ItemPage from './pages/ItemPage'; // Ensure this page component is created

function App() {
  return (
    <div className="maindiv">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Nav />
              {/* <Slider /> */}
              <Data />
              {/* <SignInForm />
              <SignUpForm /> */}
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
              <Header />
              <Nav />
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
            <>
              <Header />
              <Nav />
              {/* <AdminDashboard />  Admin Dashboard page for admins */}
              <Footer />
            </>
          }
        />
       <Route
  path="/item/:Id/price/:price"
  element={
    <>
      <Header />
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
              <Header />
              <Nav />
              <PaymentPage />
              <Footer />
            </>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
