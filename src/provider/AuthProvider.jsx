import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem("userDetails") ? true : false
    )
  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export function useAuth(){
    return useContext(AuthContext)
}