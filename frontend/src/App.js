import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homescreen />} exact></Route>
              <Route path="/product/:id" element={<ProductScreen/>} exact></Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
