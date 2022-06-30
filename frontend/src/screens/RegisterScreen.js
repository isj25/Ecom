import React,{useState,useEffect} from 'react'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {register } from "../actions/userActions";
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
    
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userRegister)
    const {loading,userInfo,error} = userLogin;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState(null);
    const redirect = location.search ? location.search.split('=')[1]: '/'

    useEffect(()=>{
        if(userInfo)
        {
                navigate(redirect);
        }
    },[navigate,redirect,userInfo]);



    function submitHandler(event)
    {
            event.preventDefault();
            //dispatch login

            if(password !=confirmPassword)
            {
                    setMessage('Password is not same')
            }else
            {
                dispatch(register(name,email,password))
              
            }
           
            
    }

  return (
    <FormContainer>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader></Loader>}
        <h3>Sign Up</h3>

        <Form onSubmit={submitHandler} className='d-grid'>
            <FormGroup controlId='text'>
                <FormLabel>User Name</FormLabel>
                <FormControl type='text' value={name} placeholder='Enter User Name' onChange={(e)=>setName(e.target.value)} required>
                </FormControl>
            </FormGroup>

            <FormGroup controlId='email'>
                <FormLabel>Email address</FormLabel>
                <FormControl type='email' value={email} placeholder='Enter email address' onChange={(e)=>setEmail(e.target.value)} required>
                
                </FormControl>
            </FormGroup>

            <FormGroup controlId='password'>
                <FormLabel>Password</FormLabel>
                <FormControl type='password' value={password} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} required>
                
                </FormControl>
            </FormGroup>
            <FormGroup controlId='confirmPassword'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type='password' value={confirmPassword} placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)} required>
                
                </FormControl>
            </FormGroup>
            <Button type='submit' variant='primary' className='btn-block my-3'>
                Register
            </Button>
        </Form>
        <Row className='py-3'>
        <Col>
           Alreay have an account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Login</Link>
        </Col>
    </Row>
        
    </FormContainer>
  )
}

export default RegisterScreen
