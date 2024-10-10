import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Home from "./pages/home/Home";
import Footer from "./pages/shared/Footer";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Jobs from "./pages/jobs/Jobs";
import JobDescription from "./pages/jobs/JobDescription";
import Browse from "./pages/browse/Browse";
import Profile from "./pages/profile/Profile";


function App() {

  return (
    <section>
      <div className="md:sticky top-0 backdrop-blur z-50 ">
        <Navbar />
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/browse" element={<Browse />}/>
          <Route path="/signUp" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/jobs" element={<Jobs />}/>
          <Route path="/description/:id" element={<JobDescription />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>

        <div>
          <Footer />
        </div>
      </div>
    </section>
  )
}

export default App
