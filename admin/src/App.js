import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import CreateAShoePost from "./pages/CreateAShoePost";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";
import UpdateShoe from "./pages/UpdateShoe";
import EditOrder from "./pages/EditOrder";

function App() {
  return (
    <div className="">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<Register />} path="/registerpuma" />
        <Route element={<Login />} path="/loginpuma" />
        <Route element={<Home />} path="/" />
        <Route
          path="/addnewproduct"
          element={
            <PrivateRoute>
              <CreateAShoePost />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <EditOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/updateproduct/:id"
          element={
            <PrivateRoute>
              <UpdateShoe />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
