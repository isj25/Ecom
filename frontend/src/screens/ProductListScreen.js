import React,{useEffect} from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button,Row,Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteProductById, listProducts,createNewProduct} from '../actions/productActions';


const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate  =useNavigate()
    const productList = useSelector((state) => state.productList);
    const { products, error, loading } = productList;
    //console.log(users)
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const deleteProduct = useSelector((state)=> state.deleteProduct);
    const {success,loading:loadingDelete,error:errorDelete}= deleteProduct;

    const createProduct = useSelector((state)=> state.createProduct);

    const {success:createProductSuccess,error:createProductError,loading:createProductLoading,product:createdProduct} = createProduct;



    const productUpdate = useSelector(state => state.productUpdate);
    const {success:updateSuccess} = productUpdate;

    useEffect(() => {
    
      if(!userInfo)
      {
        navigate('/login')
      }
      if(createdProduct)
      {
        navigate(`/admin/product/${createdProduct._id}/edit`);
         
      }
      if((userInfo && userInfo.isAdmin) || success || createProductSuccess||updateSuccess)
      {
        dispatch(listProducts());
        
      }else
      {
        navigate("/")
      }
     
    }, [dispatch,userInfo,navigate,success,createProductSuccess,createdProduct,updateSuccess]);
  
   
    function deleteButtonHandler(productId)
    {
      if(window.confirm("Are you sure You want to delete a Product?"))
      {
            //delete a product by Id
           // dispatch(deleteProductById(userId))
        dispatch(deleteProductById(productId));
        

      }

    }

    function createProductHandler()
    {
        //console.log("new product")

        dispatch(createNewProduct())

    }
  
    return (
     <>
          {createProductLoading?<Loader></Loader>:createProductError?<Message variant='danger'>{createProductError}</Message>:""}
       <Row>
            <Col md={9}>
                <h1>Products</h1>
            </Col>
            <Col md={3}>
                <Button onClick={createProductHandler} className='btn-light btn-outline-dark'><i className='fas fa-plus'></i>Add New Product</Button>
            </Col>
        </Row>
        <div>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}<LinkContainer to="/" ><span className="btn">Go Back</span></LinkContainer></Message>
        ) : (
          <>
          {loadingDelete?<Loader></Loader>:errorDelete?<Message variant='danger'>{errorDelete}</Message>:""}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
           
            <tbody>
  
            
              {products.map((product,ind)=>(
                  <tr key={ind}>
                      <td>
                          {product._id}
                      </td>
                      <td>
                          {product.name}
                      </td>
                      <td>
                          {product.price}
                      </td>
                      <td>
                          {product.category}
                      </td>
                      <td>
                          {product.brand}
                      </td>

                      <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant="light" className="btn btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>

                        <Button onClick={()=>{
                            deleteButtonHandler(product._id)
                        }} className='btn btn-sm btn-danger'>
                            <i className="fas fa-trash"></i>
                        </Button>
                    </td>
  
                      
                  </tr>
              ))}
             
            </tbody>
          </Table>
          
          </>
          
        )}
      </div>
    </>
    );
}

export default ProductListScreen
