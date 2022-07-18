import React, { useEffect } from "react";
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
  //console.log(users)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const deleteUser = useSelector((state)=>state.deleteUser);
  const {success,error:deleteError,loading:deleteLoading} = deleteUser;
  useEffect(() => {
  
    if(!userInfo)
    {
      navigate('/login')
    }

    if(userInfo && userInfo.isAdmin)
    {
      dispatch(getAllUsers());
    }else
    {
      navigate("/")
    }
   
  }, [dispatch,userInfo,navigate]);

 
  function deleteButtonHandler(userId)
  {
    if(window.confirm("Are you sure You want to delete User?"))
    {
      if(userInfo)
      {
        if(userInfo._id === userId)
        {
          window.alert("User Cannot be deleted");
        }else
        {
          dispatch(deleteUserById(userId))
        }
      }
      
    }

    
    
  }

  return (
    <div>
      {deleteLoading ? <Loader></Loader> : deleteError?<Message variant='danger'>{deleteError}</Message>:success?<Message variant='success'>{success}</Message>:""}
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}<LinkContainer to="/" ><span className="btn">Go Back</span></LinkContainer></Message>
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
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                            <Button variant="light" className="btn btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>

                        <Button onClick={()=>{
                            deleteButtonHandler(user._id)
                        }} className='btn btn-sm btn-danger'>
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
