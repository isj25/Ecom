import React,{useState,useEffect} from 'react'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {login } from "../actions/userActions";
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const {loading,userInfo,error} = userLogin;
    // console.log(userInfo)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1]: '/'


    useEffect(()=>{
                if(userInfo)
                {
                        navigate(redirect);
                }
    },[navigate,redirect,userInfo])
    function submitHandler(event)
    {
            event.preventDefault();
            //dispatch login

            dispatch(login(email,password))
    }

  return (
    <FormContainer>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}
        <h3>Sign In</h3>
        <Form onSubmit={submitHandler} className='d-grid'>
            <FormGroup controlId='email'>
                <FormLabel>Email address</FormLabel>
                <FormControl type='email' value={email} placeholder='Enter email address' onChange={(e)=>setEmail(e.target.value)} required>
                
                </FormControl>
            </FormGroup>

            <FormGroup controlId='text'>
                <FormLabel>Password</FormLabel>
                <FormControl type='password' value={password} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} required>
                
                </FormControl>
            </FormGroup>
            <Button type='submit' variant='primary' className='btn-block my-3'>
                Sign In
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
