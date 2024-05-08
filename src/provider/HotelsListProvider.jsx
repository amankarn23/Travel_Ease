import React, { createContext, useContext, useState } from 'react'

const HotelsListContext = createContext();

function HotelsListProvider({children}) {
    const [hotelList, setHotelList] = useState([]);

  return (
    <HotelsListContext.Provider value={{hotelList, setHotelList}}>
      {children}
    </HotelsListContext.Provider>
  )
}

export default HotelsListProvider

export function useHotelsListContext(){
  return useContext(HotelsListContext)
}
