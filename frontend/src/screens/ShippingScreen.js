
import React,{useState,useEffect} from 'react'
import {Button, Form,FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


const ShippingScreen = () => {




    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    let {shippingAddress} = cart;
    // console.log(userInfo)


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    useEffect(()=>{
      if(!userInfo)
      {
              navigate("/login") 
      }



  },[userInfo,navigate,dispatch]);
    
   
  if(!shippingAddress)
  {
    shippingAddress ={
      address : '',
      city : '',
      postalCode:'',
      country : ''
    }
  }

   const [address,setAddress] = useState(shippingAddress.address);
   const [city,setCity] = useState(shippingAddress.city);
   const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
   const [country,setCountry] = useState(shippingAddress.country);



    function submitHandler(event)
    {
            event.preventDefault();
            //dispatch login
            dispatch(saveShippingAddress({address,city,postalCode,country}));
            navigate("/payment");
         
    }





  return (
    <FormContainer >
      <CheckoutSteps step1 step2></CheckoutSteps>
        <h2>Shipping</h2>
        <Form onSubmit={submitHandler}>
        
            <FormGroup controlId='Address'>
            <FormLabel>Address</FormLabel>
            <FormControl type='text' value={address} placeholder='Enter Address' onChange={(e)=>setAddress(e.target.value)} required>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='City'>
            <FormLabel>City</FormLabel>
            <FormControl type='text' value={city} placeholder='Enter City' onChange={(e)=>setCity(e.target.value)} required>
            </FormControl>
            </FormGroup>


            <FormGroup controlId='PostalCode'>
            <FormLabel>Postal Code</FormLabel>
            <FormControl type='number' value={postalCode} placeholder='Enter Postal Code' onChange={(e)=>setPostalCode(e.target.value)} required>
            </FormControl>
            </FormGroup>

            <FormGroup controlId='Country'>
            <FormLabel>Country</FormLabel>
            <FormControl type='text' value={country} placeholder='Enter Country' onChange={(e)=>setCountry(e.target.value)} required>
            </FormControl>
            </FormGroup>

            <Button type='submit' className='my-3'>Continue</Button>
        
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
