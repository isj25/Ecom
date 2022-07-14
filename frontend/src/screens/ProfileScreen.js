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
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
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
      <h3>{user.name}</h3>
      <Col md={4}>
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
        <ListGroup>
          <ListGroupItem>
            <Row>
              <Col md={3}>Order Id</Col>

              <Col md={3}>Ordered On</Col>

              <Col md={2}>Quantity</Col>

              <Col md={2}>Total</Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
        <ListGroup>
          {orders.length === 0 ? (
            <h4>No recent Orders</h4>
          ) : (
            orders.map((item, ind) => {
              return (
                <ListGroup.Item key={ind}>
                  <Row className="justify-content-center">
                    <Col md={3}>
                      <Link to={`/orders/${item._id}`}>
                        Order :{String(item._id).substring(item._id.length - 6)}
                      </Link>
                    </Col>

                    <Col md={3}>
                      {dayjs(item.createdAt).format("DD/MM/YYYY").toString()}
                    </Col>

                    <Col md={2}>
                      {item.orderItems.length > 1
                        ? item.orderItems.length + " Items"
                        : item.orderItems.length + " Item"}
                    </Col>

                    <Col md={2}>${item.itemsPrice}</Col>

                    <Col md={2}>
                      <Button
                       className="btn btn-sm btn-outline-dark"
                       style={{width:'100%'}}
                        type="button"
                        variant="light"
                        onClick={() => {
                          navigate(`/orders/${item._id}`);
                        }}
                      >
                       Details
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          )}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
