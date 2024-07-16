import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import CreateAShoePost from "./pages/CreateAShoePost";
import Home from "./pages/Home";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<Register />} path="/registerpuma" />
        <Route element={<Login />} path="/loginpuma" />
        <Route element={<Home />} path="/" />
        <Route element={<CreateAShoePost />} path="/addnewproduct" />
      </Routes>
    </div>
  );
}

export default App;
