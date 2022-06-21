import React,{useState,useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import axios from 'axios';
import Product from "../components/Product";

const Homescreen = () => {
  const [products,setProducts] = useState([]);
  useEffect(()=>{
      const fetchProducts = async ()=>{
        const {data} = await axios.get("/api/products");
        setProducts(data);
      }

      fetchProducts();
  },[]);
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Homescreen;