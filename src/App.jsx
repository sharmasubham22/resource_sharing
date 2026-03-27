import './App.css'
import {Route, Routes} from 'react-router-dom';
import { useLocation } from "react-router-dom";
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
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const location = useLocation();
  const noBarPaths = ["/admin"]; 
  return (
    <div className="flex flex-col min-h-screen bg-background ">
      {!noBarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-dashboard" element={<UserDashboard />} />
        <Route path="/contact" element={<Contact />}/>

        {/* Resources Routes */}
        <Route path="/add-resource" element={<AddResource />} />
        <Route path="/resources" element={<AllResources />} />
        <Route path="/view-resource/:id" element={<ViewResource />} />
        <Route path="/resources/:category" element={<CategorizedResources />} />
        <Route path="/edit-resource/:id" element={<EditResource />} />

        {/* Blog Routes */}
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/blogs" element={<AllBlogs />} />
        <Route path="/view-blog/:id" element={<ViewBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      {!noBarPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}


