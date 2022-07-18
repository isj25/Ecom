import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
  Button,
  ListGroupItem,

} from "react-bootstrap";

import { addToCart, removeFromCart } from "../actions/cartActions";
import { LinkContainer } from "react-router-bootstrap";

const Cartscreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkoutHandler() {
    navigate("/login?redirect=shipping");
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty
            <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(event) => {
                        dispatch(
                          addToCart(item.product, Number(event.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                {" "}
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
            </ListGroupItem>
            <ListGroupItem>
              ${" "}
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem className="d-grid">
              <LinkContainer to="/">
                <Button type="button" className="btn btn-block">
                  Add More Items
                </Button>
              </LinkContainer>
            </ListGroupItem>
            <ListGroupItem className="d-grid">
              <Button
                type="button"
                onClick={checkoutHandler}
                className="btn btn-block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cartscreen;
