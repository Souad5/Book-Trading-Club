<<<<<<< Updated upstream
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import HowItWorks from './pages/HowItWorks';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import ForgotPassword from './Component/ForgotPassword';
import Login from './Component/Login';
import Dashboard from './dashboard/DashBoard';
import AdminDashboard from './dashboard/Admin/AdminDashboard';
import AddNewBook from './components/Section/AddNewBook';
<<<<<<< Updated upstream
=======
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import HowItWorks from './pages/HowItWorks'
import Register from "./pages/Register"
import BookDetails from './pages/BookDetails'
import ForgotPassword from './Component/ForgotPassword'
import Login from './Component/Login'
import Dashboard from './dashboard/DashBoard'
import AdminDashboard from './dashboard/Admin/AdminDashboard'
import AddNewBook from './components/Section/AddNewBook'
import FavouriteBooks from './pages/Wishlist'
>>>>>>> Stashed changes
=======
import FavouriteBooks from './pages/Wishlist';

import { useAuth } from './firebase/AuthProvider';
import Loader from './components/SharedComponents/Loader';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatPopup from './components/Modals/ChatPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> Stashed changes

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
<<<<<<< Updated upstream
=======
      <ChatPopup></ChatPopup>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
>>>>>>> Stashed changes
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<FavouriteBooks />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/add-book" element={<AddNewBook />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;