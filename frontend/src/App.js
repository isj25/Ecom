import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";


const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
            <Routes>
              
              <Route path="/" element={<HomeScreen />} ></Route>
              <Route path="/login" element={<LoginScreen />} ></Route>
              <Route path="/register" element={<RegisterScreen/>} ></Route>
              <Route path="/products/:id" element={<ProductScreen/>} ></Route>
              <Route path="/cart/:id" element={<CartScreen/>} ></Route>
              <Route path="/cart" element={<CartScreen/>} ></Route>
            </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
