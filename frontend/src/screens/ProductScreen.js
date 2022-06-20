import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <p className="fw-bold">{product.name}</p>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              ></Rating>
            </ListGroupItem>

            <ListGroupItem>Price : $ {product.price}</ListGroupItem>

            <ListGroupItem>Description : {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <ListGroup >
            <ListGroupItem>Price : {product.price}</ListGroupItem>
            <ListGroupItem>
              Status :{" "}
              {product.countInStock > 0 ? product.countInStock : "Out of Stock"}
            </ListGroupItem>

            <ListGroupItem className="d-grid">
              <Button
                type="button"
                className="btn-block"
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
