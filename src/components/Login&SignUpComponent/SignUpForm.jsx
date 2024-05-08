import React,{useState, useEffect, useContext, useRef} from 'react'
import { useLoginModalContext } from '../../provider/LoginModalProvider';
import { useAuth } from '../../provider/AuthProvider';


function SignUpForm() {

    const {setIsLoggedIn} = useAuth()
    const {setIsLoginModalVisible} = useLoginModalContext()
    const initialUserData = {
        name: "",
        email: "",
        password: ""
    };
    const [error, setError] = useState("")
    const [userDetails, setUserDetails] = useState(initialUserData);
    const isButtonActive = useRef(false)
    if(userDetails.name && userDetails.email && userDetails.password){
        isButtonActive.current=true;
    }
    else{
        isButtonActive.current=false;
    }
    
      async function createUser(){
        const config = {
            method: "POST",
            body: JSON.stringify({ ...userDetails, appType: "bookingportals" }),
            headers: {
              "Content-Type": "application/json",
              projectID: "f104bi07c490"
            }
        };
        try{
            const response = await fetch(
                "https://academics.newtonschool.co/api/v1/bookingportals/signup",
                config
            )
            const result = await response.json();
            const token = result.token
            if(token){
                
                localStorage.setItem("userToken", token);
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify({
                        name : result.data.user.name, 
                        email : result.data.user.email,
                        id: result.data.user._id
                    })
                );
                setIsLoginModalVisible(false)
                setIsLoggedIn(true);
            }
            else{
                setError(result.message)
                setTimeout(()=>{
                    setError("");
                },5000)
            }
        } catch(error){
            setError("Internal Server Error")
                setTimeout(()=>{
                    setError("");
                },5000)
        }
      }
      function handleInputChange(e){
        setUserDetails({...userDetails,[e.target.name]: e.target.value})
      }
      function handleSubmit(e){
        e.preventDefault();
        createUser()
      }

    return(
        <form className='signup-account-form' onSubmit={handleSubmit}>
            <label htmlFor="name">Name </label>
            <input 
                className='user-details'
                type="Text" 
                name="name" id="name"
                placeholder='Enter name'
                onChange={handleInputChange}
                value={userDetails.name}
            />
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
                placeholder='Password'
                onChange={handleInputChange}
                value={userDetails.password}
            />
            <span style={{color:'red', fontSize:'10px', fontWeight:"500"}}>{error}</span>
            <input className={`loginBtn ${isButtonActive.current && 'active-loginBtn'}`} disabled={!isButtonActive.current} type="submit" value='CONTINUE'/>
        </form>
    )
}

export default SignUpForm
