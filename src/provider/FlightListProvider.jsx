import React, { createContext, useContext, useState } from 'react'

const FlightListContext = createContext();
function FlightListProvider({children}) {
    const [flightList, setFlightList] = useState([])
  return (
    <FlightListContext.Provider value={{flightList, setFlightList}}>
        {children}
    </FlightListContext.Provider>
  )
}

export default FlightListProvider

export function useFlightListContext(){
    return useContext(FlightListContext);
}
