import React, { createContext, useContext, useReducer } from 'react'
import flightReducer, { flightBookingDetails } from '../reducer/flightReducer'

const FlightBookingDetailsContext = createContext()
function FlightBookingDetailsProvider({children}) {

  const [flightBookingState, dispatchFlightBookingState] = useReducer(flightReducer, flightBookingDetails)
  return (
    <FlightBookingDetailsContext.Provider value={{flightBookingState, dispatchFlightBookingState}}>
      {children}
    </FlightBookingDetailsContext.Provider>
  )
}

export default FlightBookingDetailsProvider

export function useFlightBookingDetailsContext(){
  return useContext(FlightBookingDetailsContext)
}
