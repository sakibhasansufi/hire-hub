
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Home from "./pages/Home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Footer from "./pages/shared/Footer";
import Jobs from "./pages/jobs/Jobs";
import Browse from "./pages/browse/Browse";
import Profile from "./pages/profile/Profile";
import JobDescription from "./pages/jobs/JobDescription";


function App() {

  return (
    <section>

      <div className="md:sticky top-0 backdrop-blur z-50 ">
        <Navbar />
      </div>

      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/description/:id" element={<JobDescription />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>

    </section>
  )
}

export default App
