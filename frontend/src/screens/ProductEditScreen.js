import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createdproductreset, productDetails,updateProduct } from '../actions/productActions';
import axios from 'axios';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import Message from "../components/Message";
import Loader from "../components/Loader";

import FormContainer from "../components/FormContainer";
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {

  const dispatch  = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  // const createProduct = useSelector(state => state.createProduct);
  // const {product} = createProduct


  const selectedproduct= useSelector(state => state.product);
  const {product} = selectedproduct

  const productUpdate = useSelector(state => state.productUpdate);
  const {success,loading :loadingUpdate,error:errorUpdate} = productUpdate

  const [name,setName] = useState("");
  const [brand,setBrand] = useState("");
  const [price,setPrice] = useState(0);
  const [category,setCategory] = useState("");
  const [countInStock,setCountInStock] = useState(0);
  const [description,setDescription] = useState("");
  const [image,setImage] = useState('');
  const [uploading,setUploading] = useState(false);

  useEffect(()=>{

      if(success)
      {
        dispatch(
          {
            type: PRODUCT_UPDATE_RESET
          }
        )

        dispatch({
          type:PRODUCT_DETAILS_RESET
        })
      }else
      {
        dispatch(createdproductreset());
        if(!product || !product.name || id!==product._id)
        {
          dispatch(productDetails(id));
        }else
        {
          setName(product.name);
          setBrand(product.brand);
          setPrice(product.price);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setImage(product.image);
  
        }
      }
     
      //console.log(product);
  },[dispatch,id,product,success])



  function submitHandler(event)
  {
    event.preventDefault();
      //update product

     const newProduct = {
        _id : id,
        name,
        brand,
        category,
        price,
        description,
        countInStock,
        image
      }
      //console.log(newProduct)
      dispatch(updateProduct(newProduct))
     
     
      navigate("/admin/productList");
  }



 const uploadFileHandler = async(e)=>{
    const file = e.target.files[0]
   // console.log(file)
    const formData = new FormData()
    formData.append('image',file);
    setUploading(true);
    try{

        const config ={
          headers :{
            'Content-Type':'multipart/form-data'
          }
        }


        const {data} = await axios.post('/api/upload',formData,config)
        setImage(data)
        setUploading(false)
    }catch(error)
    {
      console.error(error);
      setUploading(false);
    }
 }
  return (
    <>
    <Link to="/admin/productList" className="btn btn-light my-3">
      {" "}
      Go Back
    </Link>

    <h3>ADD/Update Product</h3>

    {loadingUpdate ? (
      <Loader></Loader>
    ) : errorUpdate ? (
      <Message variant="danger">
        {errorUpdate}
      </Message>
    ) : (
      <FormContainer>
        {" "}
        <Form onSubmit={submitHandler} className="d-grid">
          <FormGroup controlId="text">
            <FormLabel>Product Name</FormLabel>
            <FormControl
              type="text"
              value={name}
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
              required
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="brand">
            <FormLabel>Product Brand</FormLabel>
            <FormControl
              type="text"
              value={brand}
              placeholder="Enter Product Brand"
              onChange={(e) => setBrand(e.target.value)}
              required
            ></FormControl>
          </FormGroup>


          <FormGroup controlId="price">
            <FormLabel>Product Price</FormLabel>
            <FormControl
              type="number"
              value={price}
              placeholder="Enter Product Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="countInStock">
          <FormLabel>Product Count</FormLabel>
          <FormControl
            type="number"
            value={countInStock}
            placeholder="Enter Available Count"
            onChange={(e) => setCountInStock(e.target.value)}
            required
          ></FormControl>
        </FormGroup>


          <FormGroup controlId="category">
            <FormLabel>Product Category</FormLabel>
            <FormControl
              type="text"
              value={category}
              placeholder="Enter Product Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="description">
            <FormLabel>Product Description</FormLabel>
            <FormControl
              type="text"
              value={description}
              placeholder="Enter Product Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></FormControl>
          </FormGroup>


          <FormGroup controlId="formFile">
          <FormLabel>Image URL</FormLabel>
          <FormControl
            type="text"
            value={image}
            placeholder="Enter Image URL"
            onChange={(e) => setImage(e.target.value)}
         
          ></FormControl>
          <FormLabel>Choose File</FormLabel>
          <Form.Control type='file' onChange={uploadFileHandler} accept="image/png,image/jpeg,image/jpg"/> 
          {uploading && <Loader></Loader>}
        </FormGroup>
          

          <Button type="submit" variant="primary" className="btn-block my-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    )}
  </>
  )
}

export default ProductEditScreen
