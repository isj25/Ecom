import React, {  useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { getAllOrders } from "../actions/orderActions";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate  =useNavigate()
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const allOrders = useSelector(state => state.allOrders)
  const { loading,orders,error} = allOrders

  useEffect(() => {
  
    if(!userInfo)
    {
      navigate('/login')
    }

   

    if(userInfo && userInfo.isAdmin)
    {
        if(orders.length ===0)
        {
            dispatch(getAllOrders());
            
        }
        
    }else
    {
      navigate("/")
    }
   
  }, [dispatch,userInfo,navigate,orders]);

 
 

  return (
    <div>
   
      <h1>ALL ORDERS</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}<LinkContainer to="/" ><span className="btn">Go Back</span></LinkContainer></Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>


            {orders.map((order,ind)=>(
                <tr key={ind}>
                    <td>
                        {order._id}
                    </td>
                    <td>
                        {order.user.name}
                    </td>
                    <td>
                        {order.createdAt}
                    </td>
                    <td>
                    
                        {order.totalPrice}
                    </td>

                    <td>
                        {order.isPaid ? (<i className="fas fa-check" style={{color:'green'}}></i>): (<i className="fas fa-times" style={{color:'red'}}></i>)}
                    </td>
                    <td>
                        {order.isDelivered ? (<i className="fas fa-check" style={{color:'green'}}></i>): (<i className="fas fa-times" style={{color:'red'}}></i>)}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button variant="light" className="btn btn-sm">
                                View

                            </Button>
                        </LinkContainer>

                        
                    </td>
                </tr>
            ))}
           
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
