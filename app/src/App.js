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
import SingleShoe from "./Pages/SingleShoe";
import ShowWithDiscount from "./Pages/ShowWithDiscount";
import Cart from "./Pages/Cart";
import Address from "./Pages/Address";
import GoToCategory from "./Pages/GoToCategory";
import Protected from "./Redux/Protected";
import Order from "./Pages/Order";

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
        <Route
          element={
            <Protected>
              <Cart />
            </Protected>
          }
          path="/cart"
        />
        <Route
          element={
            <Protected>
              <Address />
            </Protected>
          }
          path="/address"
        />
        <Route
          element={
            <Protected>
              <Order />
            </Protected>
          }
          path="/order"
        />
        <Route element={<SingleShoe />} path="/singleshoe/:id" />
        <Route element={<GoToCategory />} path="/category/:name" />
        <Route element={<ShowWithDiscount />} path="/showwithdiscount/:id" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
