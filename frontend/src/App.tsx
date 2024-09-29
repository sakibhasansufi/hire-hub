
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/shared/Navbar";
import Browse from "./pages/Browse";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home/Home";

function App() {

  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>

    </section>
  )
}

export default App
