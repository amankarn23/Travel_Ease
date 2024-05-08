import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../provider/AuthProvider'
import { useLoginModalContext } from '../../provider/LoginModalProvider'

function LoginForm() {
    
    const {setIsLoginModalVisible} = useLoginModalContext()
    const {setIsLoggedIn} = useAuth()
    const [userDetails, setUserDetails] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState("")
    const isButtonActive = useRef(false)

    if(userDetails.email && userDetails.password){
        isButtonActive.current=true;
    }
    else{
        isButtonActive.current=false;
    }
    function handleInputChange(e){
        setUserDetails({...userDetails,[e.target.name]: e.target.value})
    }

    async function loginUser(){
        try{

            const response = await axios.post(
                'https://academics.newtonschool.co/api/v1/bookingportals/login',
                {...userDetails, appType: "bookingportals"},
                {headers:{projectID: "f104bi07c490"}}
            )
            const result = response.data;
            const token = result.token;
            if(token){
                
                localStorage.setItem("userToken", token);
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify({
                        name : result.data.name, 
                        email : result.data.email,
                        id : result.data._id
                    })
                );
                setIsLoginModalVisible(false)
                setIsLoggedIn(true);
            }

        } catch(error){
            setError(error.response.data.message)
            setTimeout(()=>{
                setError("");
            },5000)
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        loginUser();
    }

  return (
    <form className='login-account-form' onSubmit={handleSubmit}>
            
        <label htmlFor="email">Email </label>
        <input 
            className='user-details'
            type="email" 
            name="email" id="email"
            placeholder='Enter email'
            onChange={handleInputChange}
            value={userDetails.email}
        />
        <label htmlFor="password">Password </label>
        <input
            className='user-details'
            type="password" 
            name="password" id="password"
            placeholder='Password '
            onChange={handleInputChange}
            value={userDetails.password}
        />
        <span style={{color:'red', fontSize:'10px', fontWeight:"500"}}>{error}</span>
        <input className={`loginBtn ${isButtonActive.current && 'active-loginBtn'}`} disabled={!isButtonActive.current}   type="submit" value='CONTINUE'/>
    </form>
  )
}

export default LoginForm
