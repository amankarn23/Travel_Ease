import React, { useEffect, useRef, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SearchPageHeaderForTrain from '../components/Navbar/SearchPageHeaderForTrain'
import FlightLoader from '../components/FlightLoader'
import { useTrainListContext } from '../provider/TrainListProvider';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';
import TrainCard from '../components/TrainCard';
import { createPortal } from 'react-dom';

function RailwaySearch() {
  
  // useEffect(()=>{
  //   const token = sessionStorage.getItem("userToken");
  //   const config = {
  //     method: "POST",
  //     body : JSON.stringify({
  //       "bookingType" : "flight",
  //       "userId" : "6543652daf9136fdbc0eece0",
  //       "bookingDetails" : {
  //         "flightId":"651d50168c0d8593552252ef",
  //         "startDate":"2023-10-09T10:03:53",
  //         "endDate" : "2023-10-09T10:05:53"
  //       }
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "projectID": "f104bi07c490",
  //       "Authorization": `Bearer ${token}`
  //     }
  //   }
  //   fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking',config).then((res)=>{
  //     return res.json();
  //   }).then((result)=>{
  //     console.log(result)
  //   }).catch((e)=>{
  //     console.log(e);
  //   })

  // },[])
  const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const {trainList} = useTrainListContext()
  const [loading, setLoading] = useState(true)
  const [suggestedTrainList, setSuggestedTrainList] = useState([]);
  const [filters, setFilters] = useState({
    'AC': false,
    'SL': false,
    '1A': false,
    '2A': false,
    '3A': false
  })
  function handleFIlters(e){
    const key = e.target.name;
    setFilters({...filters,[key]:!filters[key]})
  }
  const [showFilterPortal, setShowFilterPortal] = useState(false)
  function handlePortalOnResize(){

      if (window.innerWidth > 810){
          setShowFilterPortal(false)
      }
  }
  const portalRef = useRef()
  useEffect(()=>{
    document.body.style.backgroundColor = '#E5EEF4'
    window.addEventListener('resize', handlePortalOnResize)
    return ()=>{
      document.body.style.backgroundColor = ''
      window.removeEventListener('resize', handlePortalOnResize)
    }
  },[])
  return (
    <div>
      <SearchPageHeaderForTrain setLoading={setLoading} setSuggestedTrainList={setSuggestedTrainList}/>
      
      <div className='trainSearchPage-main-container'>
        <div className='trainSearchPage-filter-container'>
          <div className='flight-filters' style={{top:'80px'}}>
            <div className='flight-popularFilter'>
              <h4>Quick Filters</h4>
              <label htmlFor="ac">
                <input onChange={handleFIlters} name='AC' type="checkbox" id='ac'/>
                AC
              </label>
              <label htmlFor="available">
                <input type="checkbox" id='available'/>
                Available
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Journey Class Filters</h4>
              <label htmlFor="1-ac">
                <input onChange={handleFIlters} name='1A' type="checkbox" id='1-ac'/>
                1st Class AC
              </label>
              <label htmlFor="2-ac">
                <input onChange={handleFIlters} name='2A' type="checkbox" id='2-ac'/>
                2 Tier AC
              </label>
              <label htmlFor="3-ac">
                <input onChange={handleFIlters} name='3A' type="checkbox" id='3-ac'/>
                3 Tier AC
              </label>
              <label htmlFor="sleeper">
                <input onChange={handleFIlters} name='SL' type="checkbox" id='sleeper' />
                Sleeper SL
              </label>
            </div>
          </div>
        </div>
        <div className='trainSearchPage-card-container'>
              {loading ? <FlightLoader/>
                : 
                <>
                  <div onClick={()=>{
                    setShowFilterPortal(n=>!n)
                  }} ref={portalRef} className='train-filter-btn'>Filters</div>
                  {showFilterPortal && 
                    <FilterPortal
                      portalRef={portalRef}
                      handleFIlters={handleFIlters}
                      setShowFilterPortal={setShowFilterPortal}
                      filters={filters}
                    />
                  }
                  {trainList.map((train)=>(
                    <TrainCard key={train._id} train={train} filters={filters}/>
                  )) }
                  {
                    trainList.length == 0 && 
                    <div className='trainSearchPage-no-train-container'>
                      <h3>No trains found for the given day.</h3>
                    </div>
                  }
                  <h3 style={{color:'#0084ff'}}>Suggested Journey</h3>
                  {suggestedTrainList.map((train)=>(
                    <TrainCard key={train._id} train={train} filters={filters}/>
                  )) }
                </>
              }
        </div>
      </div>
    </div>
  )
}

export default RailwaySearch

function FilterPortal({portalRef, filters, handleFIlters, setShowFilterPortal}){

  const myElementRef = useRef()
  function handlePortal(e){
    
    if(!portalRef.current?.contains(e.target) && !myElementRef.current?.contains(e.target) && e.target.type !== 'checkbox'){
      setShowFilterPortal(false);
    }
  }
  useEffect(()=>{
    document.body.addEventListener('click', handlePortal)
    return ()=>{
      document.body.removeEventListener('click', handlePortal)
    }
  },[])

  return(
    <>
      {
        createPortal(
          <div style={{position: "fixed", zIndex: '1000', width: '100vw', height: '100vh', backdropFilter: "blur(5px)", left: '0', top: '0'}}>
          <div onClick={(e)=>{
            e.stopPropagation()
          }} ref={myElementRef} className='show-filter-portal-container'>
            <div className='show-filter-portal-flight'>
              <div  className='flight-filters' style={{top:'80px'}}>
                <div className='flight-popularFilter'>
                  <h4>Quick Filters</h4>
                  <label htmlFor="ac">
                    <input onChange={handleFIlters} checked={filters['AC']} name='AC' type="checkbox" id='ac'/>
                    AC
                  </label>
                  <label htmlFor="available">
                    <input type="checkbox" id='available'/>
                    Available
                  </label>
                </div>
                <div className='flight-popularFilter'>
                  <h4>Journey Class Filters</h4>
                  <label htmlFor="1-ac">
                    <input onChange={handleFIlters} checked={filters['1A']} name='1A' type="checkbox" id='1-ac'/>
                    1st Class AC
                  </label>
                  <label htmlFor="2-ac">
                    <input onChange={handleFIlters} checked={filters['2A']} name='2A' type="checkbox" id='2-ac'/>
                    2 Tier AC
                  </label>
                  <label htmlFor="3-ac">
                    <input onChange={handleFIlters} checked={filters['3A']} name='3A' type="checkbox" id='3-ac'/>
                    3 Tier AC
                  </label>
                  <label htmlFor="sleeper">
                    <input onChange={handleFIlters} checked={filters['SL']} name='SL' type="checkbox" id='sleeper' />
                    Sleeper SL
                  </label>
                </div>
                <div onClick={()=>{
                  setShowFilterPortal(false)
                }} className='filter-apply-btn'>close</div>
              </div>
            </div>
          </div>
          </div>
          ,
          document.body
        )
      }
    </>
  )
}