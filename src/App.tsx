import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import AdminDashboard from './dashboard/AdminDashboard'

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
