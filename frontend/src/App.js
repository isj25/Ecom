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
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";


const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
            <Routes>
              <Route path="/order/:id" element={<OrderScreen/>}></Route>
              <Route path="/payment" element={<PaymentScreen/>}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
              <Route path="/shipping" element={<ShippingScreen/>}></Route>
              <Route path="/" element={<HomeScreen />} ></Route>
              <Route path="/login" element={<LoginScreen />} ></Route>
              <Route path="/register" element={<RegisterScreen/>} ></Route>
              <Route path="/products/:id" element={<ProductScreen/>} ></Route>
              <Route path="/cart/:id" element={<CartScreen/>} ></Route>
              <Route path="/cart" element={<CartScreen/>} ></Route>
              <Route path="/profile" element={<ProfileScreen/>}></Route>
              <Route path="/admin/userList" element={<UserListScreen></UserListScreen>}></Route>
            </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
