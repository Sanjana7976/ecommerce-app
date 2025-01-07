import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./assets/Header";
import Home from "./assets/Home";
import About from "./assets/About";
import Contact from "./assets/Contact";
import Signup from "./assets/Signup";
import Signin from "./assets/Signin";
import Footer from "./assets/Footer";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./assets/Private"
import Forgotpassword from "./assets/Forgotpassword";
import AdminDashboard from "./admin/AdminDashboard";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import Createcategory from "./admin/Createcategory";
import Createproduct from "./admin/Createproduct";
import User from "./admin/User";
import AdminRoute from "./assets/AdminRoute";
import Products from "./admin/Products";
import Updateproduct from "./admin/Updateproduct";
import Search from "./assets/Search";
import Cartitems from "./assets/Cartitems";


function App() {
  return (
    <>
      
      <BrowserRouter>
        <Header />

        <h1>Online Shopping</h1>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/About" element={<About />} />

          <Route path="/Contact" element={<Contact />} />

          <Route path="/Cart" element={<Cartitems/>}/>

          <Route path='/Search' element={<Search/>}/>


          <Route path="Dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>} />
            <Route path="user/Orders" element={<Orders/>} />
            <Route path="user/Profile" element={<Profile/>} />
          </Route>

          <Route path="Dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/Createcategory" element={<Createcategory/>} />
            <Route path="admin/Createproduct" element={<Createproduct/>} />
            <Route path="admin/Updateproduct/:slug" element={<Updateproduct/>}/>
            <Route path="admin/Products" element={<Products/>} />
            <Route path="admin/User" element={<User/>} />
          </Route>

          

          <Route path="/Signup" element={<Signup />} />

          <Route path="/Forgotpassword" element={<Forgotpassword/>}/>

          <Route path="/Signin" element={<Signin />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
