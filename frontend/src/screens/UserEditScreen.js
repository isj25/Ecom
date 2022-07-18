import React, { useState, useEffect } from "react";
import {
  Form,
  Button,

  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllUsers, getUserDetails, updateUserAdmin } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(!user.name || user._id!==userId)
    {
        dispatch(getUserDetails(userId));
    }else
    {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
    }
  }, [navigate, user, userId,dispatch]);

  function submitHandler(event) {
    event.preventDefault();
    //dispatch login

    dispatch(updateUserAdmin(name,email,isAdmin,userId));
    dispatch(getAllUsers())
    navigate("/admin/userList")
  }

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        {" "}
        Go Back
      </Link>

      <h3>UPDATE USER</h3>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">
          {error}
        </Message>
      ) : (
        <FormContainer>
          {" "}
          <Form onSubmit={submitHandler} className="d-grid">
            <FormGroup controlId="text">
              <FormLabel>User Name</FormLabel>
              <FormControl
                type="text"
                value={name}
                placeholder="Enter User Name"
                onChange={(e) => setName(e.target.value)}
                required
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="email">
              <FormLabel>Email address</FormLabel>
              <FormControl
                type="email"
                value={email}
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></FormControl>
            </FormGroup>

            <FormGroup controlId="isadmin" className="my-3">
       
              <Form.Check
                type="checkbox"
                value={email}
                label="Is Admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
      
              ></Form.Check>
            </FormGroup>

            <Button type="submit" variant="primary" className="btn-block my-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditScreen;
