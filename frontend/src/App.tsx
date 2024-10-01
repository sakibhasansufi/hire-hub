
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Browse from "./pages/Browse";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Footer from "./pages/shared/Footer";


function App() {

  return (
    <section>

      <div className="sticky top-0 backdrop-blur z-50 ">
        <Navbar />
      </div>

      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>

    </section>
  )
}

export default App
