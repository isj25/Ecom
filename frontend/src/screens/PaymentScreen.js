import React,{useEffect, useState} from 'react'
import {Button, Form,FormGroup, FormLabel, FormControl,Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;



    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    // console.log(userInfo)
  
    useEffect(()=>{
        if(!userInfo)
        {
            navigate("/login")
        }
        if(!shippingAddress)
        {
            navigate("/shipping")
        }

      
    },[shippingAddress,navigate,userInfo])
    
   const [paymentMethod,setPaymentMethod] = useState('Paypal');
  



    function submitHandler(event)
    {
            event.preventDefault();
            //dispatch login
            dispatch(savePaymentMethod(paymentMethod))
            navigate("/placeorder")
          
    }




  return (
    <FormContainer >
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h2>Payment</h2>
      <Form onSubmit={submitHandler}>
      
          <Form.Group>
          
            <Form.Label as='legend'>Select Payment Method</Form.Label>


            <Col>
            <Form.Check type='radio' label='PayPal or Credit Card' id='Paypal' name='paymentMethod' value='PayPal' checked onChange={(e)=>{
                setPaymentMethod(e.target.value)
            }}>
            
            </Form.Check>
            <Form.Check type='radio' label='PayPal or Credit Card' id='Paypal' name='paymentMethod' value='PayPal' disabled onChange={(e)=>{
                setPaymentMethod(e.target.value)
            }}>
            
            </Form.Check>
          </Col>
          </Form.Group>

         

          <Button type='submit' className='my-3'>Continue</Button>
      
      </Form>
  </FormContainer>
  )
}

export default PaymentScreen
