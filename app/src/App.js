import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import ResponsiveNavbar from "./Components/ResponsiveNavbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Secure from "./Redux/Secure";

function App() {
  return (
    <div className=" w-full">
      <ToastContainer />
      <Navbar />
      <ResponsiveNavbar />
      <Routes>
        <Route
          element={
            <Secure>
              <Register />
            </Secure>
          }
          path="/register"
        />
        <Route
          element={
            <Secure>
              <Login />
            </Secure>
          }
          path="/login"
        />
        <Route element={<Home />} path="/" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
