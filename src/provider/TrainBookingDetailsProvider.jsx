import React, { createContext, useContext, useReducer } from 'react'
import trainReducer, { trainBookingDetails } from '../reducer/trainReducer';

const TrainBookingDetailsContext = createContext(null);
function TrainBookingDetailsProvider({children}) {
  const [trainBookingState, dispatchTrainBookingState] = useReducer(trainReducer, trainBookingDetails)
  return (
    <TrainBookingDetailsContext.Provider value={{trainBookingState, dispatchTrainBookingState}}>
        {children}
    </TrainBookingDetailsContext.Provider>
  )
}

export default TrainBookingDetailsProvider

export function useTrainBookingDetailsContext(){
  return useContext(TrainBookingDetailsContext)
}