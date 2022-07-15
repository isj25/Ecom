import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
  ListGroupItem,
  Table
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/userActions";

import { getMyOrders } from "../actions/orderActions";
import dayjs from "dayjs";

const ProfileScreen = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // const redirect = location.search ? location.search.split('=')[1]: '/'

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.updateUser);
  const { success } = userUpdate;

  const myOrders = useSelector((state) => state.myOrders);
  const { error: myOrdersError, orders } =myOrders;
  // console.log(orders)

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }

    dispatch(getMyOrders());
  }, [userInfo, navigate, user, dispatch]);

  function submitHandler(event) {
    event.preventDefault();
    //dispatch login

    if (password !== confirmPassword) {
      setMessage("Password is not same");
    } else {
      dispatch(updateUserDetails(name, email, password));
    }
  }

 

  return (
    <Row>
   
      <Col md={4}>
      <h3>{user.name}</h3>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">{success}</Message>}
        {loading && <Loader></Loader>}

        <Form onSubmit={submitHandler} className="d-grid">
          <FormGroup controlId="text">
            <FormLabel>User Name</FormLabel>
            <FormControl
              type="text"
              value={name}
              placeholder="Enter User Name"
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="email">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button type="submit" variant="primary" className="btn-block my-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h3>Order History</h3>
        {myOrdersError ? <Message variant='danger'>{myOrdersError}</Message>:""}
        <Table striped bordered hover responsive size="sm"  className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
    </Col>
  </Row>
  );
};

export default ProfileScreen;
