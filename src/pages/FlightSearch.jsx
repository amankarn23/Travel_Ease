import React, { useEffect, useRef, useState } from 'react'
import Profile from '../components/Profile'
import LoginModalProvider from '../provider/LoginModalProvider'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams } from 'react-router-dom'
import getFlightList from '../utils/getFlightList'
import SearchPageHeaderForFlight from '../components/Navbar/SearchPageHeaderForFlight'
import { useFlightListContext } from '../provider/FlightListProvider'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'
import FlightCard from '../components/FlightCard'
import FlightLoader from '../components/FlightLoader'
import { createPortal } from 'react-dom'

const flightIcons = {
  '6E' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png?v=17", name: 'IndiGo'},
  'UK' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png?v=17", name: 'Vistara'},
  'AI' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=17", name: 'Air India'},
  'SG' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png?v=17", name: 'Spice Jet'},
  'G8' :{img: 'https://airhex.com/images/airline-logos/go-first.png', name: 'Go First'}
}
function FlightSearch() {
  
  const {flightList} = useFlightListContext()
  const{flightBookingState} = useFlightBookingDetailsContext()
  const flightSourceRef = useRef(flightBookingState.fromCity)
  const flightDestinationRef = useRef(flightBookingState.toCity)
  const [filteredFlights, setFilteredFlights] = useState([])

  const [filters, setFilters] = useState({
    flights: {
      '6E' : false, 'UK': false, 'AI': false, 'SG': false, 'G8': false
    },
    stops: {
      '0': false, '1': false, '2': false
    },
    sort: {
      asec: false, dsec: false
    },
    departure: {
      'before6Am' : false, '6AmTo12Pm': false, '12PmTo6Pm': false, 'after6Pm': false
    }
  })
  
  const [loading, setLoading] = useState(true)
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
  function handleFilter(){
      let isFilterApply = false;
      let filteredFilghts = [...flightList];
      for(const element in filters){
        for(const property in filters[element]){
          if(filters[element][property]){
            isFilterApply = true;
          }
        }
      }
      const flightIdFilter = Object.keys(filters.flights).filter((item)=>filters.flights[item])
      if(flightIdFilter.length > 0){
        filteredFilghts =  filteredFilghts.filter((flight)=>{
          if(flightIdFilter.indexOf(flight.flightID.substring(0,2)) >= 0){
            return true;
          }
        })
      }
      const stopFilter = Object.keys(filters.stops).filter((item)=>filters.stops[item])
      if(stopFilter.length > 0){
        filteredFilghts = filteredFilghts.filter((flight)=>{
          if(stopFilter.indexOf(flight.stops.toString()) >= 0){
            return true
          }
        })
      }
      if(filters.sort.asec){
        filteredFilghts.sort((a,b)=> a.ticketPrice - b.ticketPrice)
      }
      else if(filters.sort.dsec){
        filteredFilghts.sort((a,b)=> b.ticketPrice - a.ticketPrice)
      }
      setFilteredFlights(filteredFilghts)
  }
  useEffect(()=>{
    if(flightList.length > 0)
    handleFilter()
  },[flightList, filters])

  function handleFlightID(e){
    const key = e.target.name;
    setFilters({...filters,flights:{...filters.flights, [key]: !filters.flights[key]}})
  }
  function handleStops(e){
    const key = e.target.name;
    setFilters({...filters,stops:{...filters.stops, [key]: !filters.stops[key]}})
  }
  function handleSorting(e){
    const key = e.target.name;
    const property = key == 'asec' ? 'dsec' : 'asec';
    setFilters({...filters, sort:{[key]: !filters.sort[key], [property]: false}})
  }
  return (
    <div>
      {/* <SearchNavbar/> */}
      <SearchPageHeaderForFlight flightSourceRef={flightSourceRef} flightDestinationRef={flightDestinationRef} setLoading={setLoading}/>
      <div className='flightList-container'>
        
        <div className='show-filter'>
          <div className='flight-filters'>
            <div className='flight-popularFilter'>
              <h4>Popular Filters</h4>
              <label htmlFor="non-stop">
                <input onChange={handleStops} name='0' checked={filters.stops['0']} id='non-stop' type="checkbox" />
                Non Stop
              </label>
              <label htmlFor="indigo">
                <input onChange={handleFlightID} id='indigo' checked={filters.flights['6E']} name='6E' type="checkbox" />
                <img src={flightIcons['6E'].img} alt="" />
                IndiGo
              </label>
              <label htmlFor="vistara">
                <input onChange={handleFlightID} id='vistara' checked={filters.flights['UK']} name='UK' type="checkbox" />
                <img src={flightIcons['UK'].img} alt="" />
                Vistara
              </label>
              <label htmlFor="airindia">
                <input onChange={handleFlightID} id='airindia' checked={filters.flights['AI']} name='AI' type="checkbox" />
                <img src={flightIcons['AI'].img} alt="" />
                Air India
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Sort By Price</h4>
              <label htmlFor="asec">
                <input onChange={handleSorting} name='asec' checked={filters.sort.asec} id='asec' type="checkbox" />
                Low to High
              </label><label htmlFor="dsec">
                <input onChange={handleSorting} name='dsec' checked={filters.sort.dsec} id='dsec' type="checkbox" />
                High to Low
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Stops From {flightSourceRef.current}</h4>
              <label htmlFor="non-stop">
                <input onChange={handleStops} name='0' checked={filters.stops['0']} id='non-stop' type="checkbox" />
                Non Stop
              </label>
              <label htmlFor="1-stop">
                <input onChange={handleStops} name='1' checked={filters.stops['1']} id='1-stop' type="checkbox" />
                1 Stop
              </label>
              <label htmlFor="2-stop">
                <input onChange={handleStops} name='2' checked={filters.stops['2']} id='2-stop' type="checkbox" />
                2 Stop
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Airlines</h4>
              <label htmlFor="indigo">
                <input onChange={handleFlightID} id='indigo' checked={filters.flights['6E']} name='6E' type="checkbox" />
                <img src={flightIcons['6E'].img} alt="" />
                IndiGo
              </label>
              <label htmlFor="vistara">
                <input onChange={handleFlightID} id='vistara' checked={filters.flights['UK']} name='UK' type="checkbox" />
                <img src={flightIcons['UK'].img} alt="" />
                Vistara
              </label>
              <label htmlFor="airindia">
                <input onChange={handleFlightID} id='airindia' checked={filters.flights['AI']} name='AI' type="checkbox" />
                <img src={flightIcons['AI'].img} alt="" />
                Air India
              </label>
              <label htmlFor="spicejet">
                <input onChange={handleFlightID} id='spicejet' checked={filters.flights['SG']} name='SG' type="checkbox" />
                <img src={flightIcons['SG'].img} alt="" />
                Spice Jet
              </label>
              <label htmlFor="gofirst">
                <input onChange={handleFlightID} id='gofirst' checked={filters.flights['G8']} name='G8' type="checkbox" />
                <img src={flightIcons['G8'].img} alt="" />
                Go First
              </label>
            </div>
           {/*remaining */} <div className='flight-departureFilter'>
              <h4>Departure From {flightSourceRef.current}</h4>
              <div>
                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_active.png?v=1" alt="" />
                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_inactive.png?v=1" alt="" />
              </div>
            </div>
          </div>

        </div>
        <div>
          <div className='bold-text font24' style={{color:'#fff'}}>Flights from {flightSourceRef.current} to {flightDestinationRef.current}</div>
          <div onClick={()=>{
            setShowFilterPortal(n=>!n)
            
          }} ref={portalRef} className='filght-filter-btn'>Filters
          {showFilterPortal && <FilterPortal
           handleFlightID={handleFlightID} 
           handleStops={handleStops}
           handleSorting={handleSorting}
           filters={filters}
           setShowFilterPortal={setShowFilterPortal}
           flightSourceRef={flightSourceRef}
           portalRef={portalRef}
           />}
          </div>
          <div className='flight-add-bar'>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/amex.png" alt="" />
              <div>
                <h4>FREE Zero Cancellation</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>& FLAT 8% OFF* with American Express Cards. Code: AMEXZC </span>
              </div>
            </div>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/myMedRefund.png" alt="" />
              <div>
                <h4>Get Full Refund</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>on your flight tickes, due to medical emergencies</span>
              </div>
            </div>
            <div className='makeFlex'>
              <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/lock_2.png" alt="" />
              <div>
                <h4>Price Lock: Pay Later</h4>
                <span className='promotionRedline'></span><br></br>
                <span className='font12'>Unsure about your plans? Secure prices now, pay later</span>
              </div>
            </div>
          </div>
          
          {loading  ? <FlightLoader/> :
          <>
          {
            filteredFlights.length == 0 ? 
            <div style={{color:'grey',display:"flex",alignItems:"center",justifyContent:"center" , height: "200px", backgroundColor:"inherit"}}>Oops No Flight Found!!</div> 
            :
            <ul className='flight-card-container'>
              
              {
                filteredFlights.map((item) => (
                  <FlightCard key={item._id} flight={item}/>
                ))          
              }
            </ul>
          }</>}
        </div>
      </div>
      
    </div>
  )
}

export default FlightSearch

function FilterPortal({portalRef, setShowFilterPortal, handleFlightID, handleSorting, handleStops, filters, flightSourceRef}){

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
    createPortal(
      <div style={{position: "fixed", zIndex: '1000', width: '100vw', height: '100vh', backdropFilter: "blur(5px)", left: '0', top: '0'}}>
      <div onClick={(e)=>{
        e.stopPropagation()
      }} ref={myElementRef} className='show-filter-portal-container'>
      <div className='show-filter-portal-flight'>
          <div onClick={(e)=>e.stopPropagation} className='flight-filters'>
            <div className='flight-popularFilter'>
              <h4>Popular Filters</h4>
              <label htmlFor="non-stop">
                <input onChange={handleStops} name='0' checked={filters.stops['0']} id='non-stop' type="checkbox" />
                Non Stop
              </label>
              <label htmlFor="indigo">
                <input onChange={handleFlightID} id='indigo' checked={filters.flights['6E']} name='6E' type="checkbox" />
                <img src={flightIcons['6E'].img} alt="" />
                IndiGo
              </label>
              <label htmlFor="vistara">
                <input onChange={handleFlightID} id='vistara' checked={filters.flights['UK']} name='UK' type="checkbox" />
                <img src={flightIcons['UK'].img} alt="" />
                Vistara
              </label>
              <label htmlFor="airindia">
                <input onChange={handleFlightID} id='airindia' checked={filters.flights['AI']} name='AI' type="checkbox" />
                <img src={flightIcons['AI'].img} alt="" />
                Air India
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Sort By Price</h4>
              <label htmlFor="asec">
                <input onChange={handleSorting} name='asec' checked={filters.sort.asec} id='asec' type="checkbox" />
                Low to High
              </label><label htmlFor="dsec">
                <input onChange={handleSorting} name='dsec' checked={filters.sort.dsec} id='dsec' type="checkbox" />
                High to Low
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Stops From {flightSourceRef.current}</h4>
              <label htmlFor="non-stop">
                <input onChange={handleStops} name='0' checked={filters.stops['0']} id='non-stop' type="checkbox" />
                Non Stop
              </label>
              <label htmlFor="1-stop">
                <input onChange={handleStops} name='1' checked={filters.stops['1']} id='1-stop' type="checkbox" />
                1 Stop
              </label>
              <label htmlFor="2-stop">
                <input onChange={handleStops} name='2' checked={filters.stops['2']} id='2-stop' type="checkbox" />
                2 Stop
              </label>
            </div>
            <div className='flight-popularFilter'>
              <h4>Airlines</h4>
              <label htmlFor="indigo">
                <input onChange={handleFlightID} id='indigo' checked={filters.flights['6E']} name='6E' type="checkbox" />
                <img src={flightIcons['6E'].img} alt="" />
                IndiGo
              </label>
              <label htmlFor="vistara">
                <input onChange={handleFlightID} id='vistara' checked={filters.flights['UK']} name='UK' type="checkbox" />
                <img src={flightIcons['UK'].img} alt="" />
                Vistara
              </label>
              <label htmlFor="airindia">
                <input onChange={handleFlightID} id='airindia' checked={filters.flights['AI']} name='AI' type="checkbox" />
                <img src={flightIcons['AI'].img} alt="" />
                Air India
              </label>
              <label htmlFor="spicejet">
                <input onChange={handleFlightID} id='spicejet' checked={filters.flights['SG']} name='SG' type="checkbox" />
                <img src={flightIcons['SG'].img} alt="" />
                Spice Jet
              </label>
              <label htmlFor="gofirst">
                <input onChange={handleFlightID} id='gofirst' checked={filters.flights['G8']} name='G8' type="checkbox" />
                <img src={flightIcons['G8'].img} alt="" />
                Go First
              </label>
            </div>
            {/* <div className='flight-departureFilter'>
              <h4>Departure From {flightSourceRef.current}</h4>
              <div>
                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_active.png?v=1" alt="" />
                <img src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_inactive.png?v=1" alt="" />
              </div>
            </div> */}
            <div onClick={()=>{
              setShowFilterPortal(false)
            }} className='filter-apply-btn'>close</div>
          </div>
        </div>
        </div>
        </div>,
        document.body
    )
  )
}