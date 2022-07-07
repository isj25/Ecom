
import React,{useEffect} from 'react'
import {Image,Button,Col, Row,ListGroup} from 'react-bootstrap';
import {useNavigate,Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message"
import CheckoutSteps from '../components/CheckoutSteps';
import {createOrder} from "../actions/orderActions.js"



const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  let {shippingAddress} = cart;


  const orderCreate = useSelector(state=> state.orderCreate);
  const { error,success,order} = orderCreate

console.log(order)

  //to round off numbers

  const addDecimal = (number)=>{

    return ((number * 100)/100).toFixed(2)
  }




  function placeOrderHandler()
  {
      dispatch(createOrder({
        orderItems : cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemsPrice : cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice : cart.taxPrice,
        totalPrice : cart.totalPrice
      }));
  }

  useEffect(()=>{
    if(!shippingAddress)
    {
      navigate("/login?redirect=shipping")
    }

    //console.log(order);
    if(order)
    {
      navigate(`/orders/${order._id}`);
    }
   

  },[shippingAddress,order,navigate])
  cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc,item)=>(acc+ item.qty * item.price),0));
  cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimal((cart.itemsPrice * 0.15).toFixed(2));
  cart.totalPrice =addDecimal(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
     <Row>
      {success ? <Message variant='success'>{success}</Message> : ""}
      {error ? <Message variant='danger'>{error}</Message>:""}
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
            Shipping
            </h2>
            <p>
              <strong>
                Address : 
              </strong>
              {shippingAddress? shippingAddress.address : ""}
              ,
              {shippingAddress? shippingAddress.city : ""}
              <br/>
              {shippingAddress? shippingAddress.postalCode : ""}
              <br/>
              {shippingAddress? shippingAddress.country : ""}
      
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
          
            <h2>Payment Method</h2>
            <p>
              {cart.paymentMethod}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Details</h2>
            <ListGroup variant='flush'>

            {
              cart.cartItems.map((item,ind)=>{
             return <ListGroup.Item key={ind}>
              <Row>
                <Col md={2}>
                  <Link to={`/products/${item.product}`}>
                    <Image src={item.image} rounded fluid alt={item.name}/>
                  </Link>
                </Col>
                <Col md={4}>
                  <Link to={`/products/${item.product}`}>
                    {item.name}
                  </Link>
                </Col>
                <Col md={1}>
                  {
                    item.qty
                  }
                </Col>

                <Col md={2}>
                ${' '}
                  {
                    item.price
                  }
                </Col>

                <Col md={2}>
                $ {' '}
                  {
                    item.price * item.qty
                  }
                
                </Col>
              
              </Row>
             
              </ListGroup.Item>
            })
          }
            </ListGroup>
          </ListGroup.Item>
        
        </ListGroup>
      </Col>

      <Col md={4}>
        <ListGroup>
          <h2>Order Summary</h2>
          <ListGroup.Item>
              <Row>
                <Col>
                  Items
                </Col>
                <Col>

                ${cart.itemsPrice} 
                </Col>
              </Row>

              <Row>
                <Col>
                  Shipping
                </Col>
                <Col>
                ${cart.shippingPrice}
                </Col>
              </Row>
              <Row>
              <Col>
                Tax
              </Col>
              <Col>
              ${cart.taxPrice}
              </Col>
            </Row>

              <Row>
              <Col>
                Total
              </Col>
              <Col>
              ${cart.totalPrice}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className='d-grid'>
          
            <Button className='btn-block primary' disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>
                Place Order
            </Button>
          </ListGroup.Item>
        </ListGroup>
      
      </Col>
     
     </Row>

    </>
  )
}

export default PlaceOrderScreen
