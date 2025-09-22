import { Route, Routes } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import HowItWorks from './pages/HowItWorks'
import Register from "./pages/Register";
import BookDetails from './pages/BookDetails'
import ForgotPassword from './Component/ForgotPassword'
import Login from './Component/Login'

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/forget" element={<ForgotPassword></ForgotPassword>} />
          
          
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
