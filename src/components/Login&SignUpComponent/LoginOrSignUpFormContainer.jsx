import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function LoginOrSignUpFormContainer() {

    const [signUpPage, setSignUpPage] = useState(false);

  return (
    
    <div className='login-form-container'>
        <div className='login-account-type'>
            <span>PERSONAL ACCOUNT</span>
            <span title='currently disabled'>EASE ACCOUNT</span>
        </div>
        {!signUpPage && <LoginForm/>}
        {!signUpPage && <p>Not a user?{" "}  
            <span onClick={()=>{setSignUpPage(true)}}>Click here to sign up</span>
        </p>}

        {signUpPage && <SignUpForm/>}
        {signUpPage && <p>Already a user?{" "}  
            <span onClick={()=>{setSignUpPage(false)}}>Click here to login</span>
        </p>}
    </div>
    
  )
}


export default LoginOrSignUpFormContainer
