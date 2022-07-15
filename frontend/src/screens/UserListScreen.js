import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllUsers,deleteUserById } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate  =useNavigate()
  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
  
    if(!userInfo)
    {
      navigate('/login')
    }
    dispatch(getAllUsers());
  }, [dispatch,userInfo]);

 
  function deleteButtonHandler(userId)
  {
    dispatch(deleteUserById(userId))
  }

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>


            {users.map((user,ind)=>(
                <tr key={ind}>
                    <td>
                        {user._id}
                    </td>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>

                    <td>
                        {user.isAdmin ? (<i className="fas fa-check" style={{color:'green'}}></i>): (<i className="fas fa-times" style={{color:'red'}}></i>)}
                    </td>
                    <td>
                        <LinkContainer to={`/user/${user._id}/edit`}>
                            <Button variant="light" className="btn btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>

                        <Button onClick={()=>{
                            deleteButtonHandler(user._id)
                        }} className='btn btn-sm'>
                            <i className="fas fa-trash"></i>
                        </Button>
                    </td>
                </tr>
            ))}
           
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
