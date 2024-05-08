import React, { createContext, useContext, useReducer } from 'react'
import hotelReducer, { hotalBookingDetails } from '../reducer/hotelReducer'

const HotelBookingDetailsContext = createContext()
function HotelBookingDetailsProvider({children}) {
  const [hotelBookingState, dispatchHotelBookingState] = useReducer(hotelReducer, hotalBookingDetails)
  return (
    <HotelBookingDetailsContext.Provider value={{hotelBookingState, dispatchHotelBookingState}}>
        {children}
    </HotelBookingDetailsContext.Provider>
  )
}

export default HotelBookingDetailsProvider
export function useHotelBookingDetailsContext(){
  return useContext(HotelBookingDetailsContext);
}
