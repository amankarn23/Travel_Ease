import React, { createContext, useContext, useState } from 'react'

const TrainListContext = createContext();
function TrainListProvider({children}) {
    const [trainList, setTrainList] = useState([])
  return (
    <TrainListContext.Provider value={{trainList, setTrainList}}>
        {children}
    </TrainListContext.Provider>
  )
}

export default TrainListProvider

export function useTrainListContext(){
    return useContext(TrainListContext);
}
