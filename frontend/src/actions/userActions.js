import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"
import axios from "axios";
import expressAsyncHandler from "express-async-handler";

export const login = (email,password) => async(dispatch)=>{
    try{

        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const {data} =  await axios.post("/api/users/login",{email,password},config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload : data
        })
       // console.log(data)
        localStorage.setItem('userInfo',JSON.stringify(data));

    }catch (error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const logout =() => (dispatch)=>{
    localStorage.clear();
    window.location.reload();
    dispatch({
        type:USER_LOGOUT
    })
}



export const register = (name,email,password)=>async(dispatch)=>{
            try{
                dispatch({
                    type:USER_REGISTER_REQUEST
                })
                
                const config = {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
        
                const {data} = await axios.post("/api/users",{name,email,password},config);
                localStorage.setItem('userInfo',JSON.stringify(data));
               // console.log(data);
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload : data
                })
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload : data
                })
            }catch(error)
            {
                dispatch({
                    type: USER_REGISTER_FAIL,
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
            }
}



export const getUserDetails = (id) => async(dispatch,getState)=>{
     
    try{

            dispatch({
                type:USER_DETAILS_REQUEST
            });

            const user = getState().userLogin.userInfo;
            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization : `Bearer ${user.token}`
                }
            }

            const {data} = await axios.get(`/api/users/${id}`,config)

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload : data
            })
        
    }catch(error)
    {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const updateUserDetails = (name,email,password) =>async(dispatch,getState)=>{


    try{


        dispatch({
            type:USER_UPDATE_REQUEST
        });

        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }

        const {data} = await axios.put("/api/users/profile",{name,email,password},config)
        localStorage.setItem('userInfo',JSON.stringify(data));
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload : data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload : data
        })

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload : data
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload : data
        })

    }catch(error)
    {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }


}



export const getAllUsers = () => async(dispatch,getState)=>{
     
    try{

            dispatch({
                type:USER_LIST_REQUEST
            });

            const user = getState().userLogin.userInfo;
            const config = {
                headers:{
                    'Content-Type':'application/json',
                    Authorization : `Bearer ${user.token}`
                }
            }

            const {data} = await axios.get("/api/users",config);
      
            //console.log(data)

            dispatch({
                type: USER_LIST_SUCCESS,
                payload : data
            })
        
    }catch(error)
    {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



export const deleteUserById = (userId) => expressAsyncHandler(async (dispatch,getState)=>{


    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const userLogin = getState().userLogin;
        const {userInfo}  = userLogin
        
        const config = {
            headers :{
                'Content-Type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`/api/users/${userId}`,config);
        dispatch({
                type: USER_DELETE_SUCCESS
        });
        dispatch({
            type : USER_LIST_SUCCESS,
            payload : data
        })

    }catch(error)
    {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

    



})



export const updateUserAdmin = (name,email,isAdmin,userId) =>async(dispatch,getState)=>{


    try{


        dispatch({
            type:USER_UPDATE_REQUEST
        });

        const user = getState().userLogin.userInfo;
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization : `Bearer ${user.token}`
            }
        }

        const {data} = await axios.put(`/api/users/${userId}`,{name,email,isAdmin},config)
        
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload : data
        })

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

        if(userId === user._id)
        {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload : data
            })
    
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload : data
            })
        }


    }catch(error)
    {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }


}