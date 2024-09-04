import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ErrorPage from "./Pages/ErrorPage";
import Logout from "./Pages/Logout";
import AdminLayout from "./Components/Layouts/AdminLayout";
import AdminUsers from "./Pages/AdminUsers";
import AdminContacts from "./Pages/AdminContacts";
import AdminServices from "./Pages/AdminServices";
import AdminUpdate from "./Pages/AdminUpdate";
import { useAuth } from "./store/auth";

const styled = {
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  height: "100vh"
}

const App = () => {
  const { isLoading } = useAuth();
  if(isLoading){
    return <h1 style={styled}>Loading...</h1>;
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>} />
          <Route path="contacts" element={<AdminContacts/>} />
          <Route path="services" element={<AdminServices/>} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
