import { Outlet } from "react-router";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const App = () => {
  return (
    <div className="min-h-screen font-primary bg-blue-100">
      <Navbar />
      <div className="w-[95%] container mx-auto px-2 md:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
