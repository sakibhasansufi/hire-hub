import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";
import Home from "./pages/home/Home";
import ProtectedRoute from "./admin/ProtectedRoute";
import UserProtectedRoute from "./pages/home/UserProtectedRoute";
import Browse from "./pages/browse/Browse";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Jobs from "./pages/jobs/Jobs";
import JobDescription from "./pages/jobs/JobDescription";
import Profile from "./pages/profile/Profile";
import Companies from "./admin/company/Companies";
import AdminJobs from "./admin/adminJobs/AdminJobs";
import UpdateJob from "./admin/adminJobs/UpdateJob";
import PostJobs from "./admin/adminJobs/PostJobs";
import CreateCompany from "./admin/company/CreateCompany";
import CompanySetUp from "./admin/company/CompanySetUp";
import Applicants from "./admin/applicants/Applicants";



function App() {

  return (
    <section>

      <div className="md:sticky top-0 backdrop-blur z-50">
        <Navbar />
      </div>


      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/description/:id" element={<UserProtectedRoute><JobDescription /></UserProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin routes */}
          <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/jobs/:id" element={<ProtectedRoute> <UpdateJob /></ProtectedRoute>} />
          <Route path="/admin/jobs/create" element={<ProtectedRoute><PostJobs /></ProtectedRoute>} />
          <Route path="/admin/companies/create" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
          <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetUp /></ProtectedRoute>} />
          <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        </Routes>


        <div>
          <Footer />
        </div>

      </div>
    </section>
  );
}

export default App;
