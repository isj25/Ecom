import React, { useEffect } from "react";
import { Image,Col, Row, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";


import { clearOrder, getOrderDetails } from "../actions/orderActions.js";
import { clearCart } from "../actions/cartActions";


const OrderScreen = () => {


  const dispatch = useDispatch();

  const { id } = useParams();


  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

 



  useEffect(() => {


    //  

      if(order)
      { 
        dispatch(clearCart());
        dispatch(clearOrder());
      }

      if(!order || order._id !== id )
      {
        dispatch(getOrderDetails(id));
      }
    }, [id,dispatch,order]);

  return (
  loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
  
      <h2>Order</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
       
              <p className="fw-bold">Order :{order._id} </p>
              <p className="fw-bold">Name : {order.user.name}</p> 
              <p className="fw-bold">email : {order.user.email}</p> 

              <p className="fw-bold">
                <strong >Address : </strong>
                { order.shippingAddress.address },
                { order.shippingAddress.city }
                <br />
                { order.shippingAddress.postalCode }
                <br />
                { order.shippingAddress.country }
              </p>
             
            </ListGroup.Item>
            {order.isDelivered? <Message variant='success'>Delivered</Message> :<Message variant='danger'>Not Delivered</Message>}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
           
            </ListGroup.Item>
              {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message> :<Message variant='danger'>Not Paid</Message>}
            <ListGroup.Item>
              <h2>Order Details</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item, ind) => {
                  return (
                    <ListGroup.Item key={ind}>
                      <Row>
                        <Col md={2}>
                          <Link to={`/products/${item.product}`}>
                            <Image
                              src={item.image}
                              rounded
                              fluid
                              alt={item.name}
                            />
                          </Link>
                        </Col>
                        <Col md={4}>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={1}>{item.qty}</Col>

                        <Col md={2}>$ {item.price}</Col>

                        <Col md={2}>$ {item.price * item.qty}</Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <h2>Order Summary</h2>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>

              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>

              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            
          </ListGroup>
        </Col>
      </Row>
    </>
  ));
  
};

export default OrderScreen;
