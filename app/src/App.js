import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import ResponsiveNavbar from "./Components/ResponsiveNavbar";
import Home from "./Pages/Home";

function App() {
  return (
    <div className=" w-full">
      <ToastContainer />
      <Navbar />
      <ResponsiveNavbar />
      <Routes>
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Home />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
