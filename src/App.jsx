import './App.css'
import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/UserAuthentication/LoginPage.jsx';
import SignupPage from './pages/UserAuthentication/SignupPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AddResource from './pages/RecourcesFiles/AddResource.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AllResources from './pages/RecourcesFiles/AllResources.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import ViewResource from './pages/RecourcesFiles/ViewResource.jsx';
import CategorizedResources from './pages/RecourcesFiles/CategorizedResources.jsx';
import EditResource from './pages/RecourcesFiles/EditResource.jsx';
import AddBlog from "./pages/Blogs/AddBlog.jsx";
import AllBlogs from "./pages/Blogs/AllBlogs.jsx";
import ViewBlog from './pages/Blogs/ViewBlog.jsx';
import EditBlog from './pages/Blogs/EditBlog.jsx';
// import "flowbite";

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/resources" element={<AllResources />} />
        <Route path="/my-dashboard" element={<UserDashboard />} />
        <Route path="/view-resource/:id" element={<ViewResource />} />
        <Route path='/resources/:category' element={<CategorizedResources />}/>
        <Route path='/edit-resource/:id' element={<EditResource />}/>
        <Route path='/add-blog' element={<AddBlog />}/>
        <Route path='/blogs' element={<AllBlogs />}/>
        <Route path='/view-blog/:id' element={<ViewBlog />}/>
        <Route path='/edit-blog/:id' element={<EditBlog />}/>
      </Routes>
      <Footer />
    </div>
  );
}


