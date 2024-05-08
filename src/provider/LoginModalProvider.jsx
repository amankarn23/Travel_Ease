import React, { createContext, useContext, useState } from 'react'

const LoginModalContext = createContext();
function LoginModalProvider({children}) {
    const [isLoginModalVisible , setIsLoginModalVisible] = useState(false);
  return (
    <LoginModalContext.Provider value={{isLoginModalVisible, setIsLoginModalVisible}}>
        {children}
    </LoginModalContext.Provider>
  )
}

export default LoginModalProvider

export function useLoginModalContext(){
    return useContext(LoginModalContext)
}