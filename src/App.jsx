import './App.css'
import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AddResource from './pages/AddResource.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AllResources from './pages/AllResources.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import ViewResource from './pages/ViewResource.jsx';
// import "flowbite";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/resources" element={<AllResources />} />
        <Route path="/my-dashboard" element={<UserDashboard />} />
        <Route path="/view-resource/:id" element={<ViewResource />} />
      </Routes>
      <Footer />
    </>
  );
}


