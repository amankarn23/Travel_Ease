import React, { useEffect, useRef, useState } from 'react'
import SearchPageHeaderForHotel from '../components/Navbar/SearchPageHeaderForHotel'
import { useHotelsListContext } from '../provider/HotelsListProvider'
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider'
import HotelCard from '../components/HotelCard'
import { createPortal } from 'react-dom'


function HotelSearch() {
    
  const{hotelList} = useHotelsListContext()
  const{hotelBookingState} = useHotelBookingDetailsContext()

  const hotelCityRef = useRef(hotelBookingState.city)
  const [filteredHotelList, setFilteredHotelList] = useState([])
  const [priceFilter, setPriceFilter] = useState({
    'below2k': false, 'between2kAnd4k': false, 'between4kand6k': false, 'above6k': false
  })

  const [showFilterPortal, setShowFilterPortal] = useState(false)
  const [showSortPortal, setShowSortPortal] = useState(false)
  const portalRef = useRef()
  const portalSortRef = useRef()

  function handleFilter(){
    let filteredResult=[]
    let isFilterApply = false;
    for(const element in priceFilter){
      if(priceFilter[element]){
        isFilterApply = true;
      }
    }
    if(isFilterApply){
     if(priceFilter.below2k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost < 2000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.between2kAnd4k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost >= 2000 && hotel.rooms[0].costDetails.baseCost <= 4000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.between4kand6k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost >= 4000 && hotel.rooms[0].costDetails.baseCost <= 6000
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     if(priceFilter.above6k){
      const filteredArr = hotelList.filter((hotel)=>{
        return hotel.rooms[0].costDetails.baseCost > 6000 
      })
      filteredResult = [...filteredResult, ...filteredArr]
     }
     setFilteredHotelList([...filteredResult])
    }
    else{
      setFilteredHotelList([...hotelList])
    }
  }

  function handlePortalOnResize(){

    if (window.innerWidth > 705){
      setShowFilterPortal(false)
    }
  }
  useEffect(()=>{
    window.addEventListener('resize', handlePortalOnResize)
    return ()=>{
      document.body.style.backgroundColor = ''
      window.removeEventListener('resize', handlePortalOnResize)
    }
  },[])
  
  useEffect(()=>{
    handleFilter()
  },[hotelList, priceFilter])
  function handlePriceFilter(e){
    const {name} = e.target
    setPriceFilter({...priceFilter, [name]: !priceFilter[name]})
  }
  return (
    <div>
      <SearchPageHeaderForHotel portalSortRef={portalSortRef} showSortPortal={showSortPortal} setShowSortPortal={setShowSortPortal} setFilteredHotelList={setFilteredHotelList} priceFilter={priceFilter} hotelCityRef={hotelCityRef}/>
      <div className='hotel-searchPage-list-container'>
        <div>
          <div className='flight-filters' style={{top: '136px'}}>
            <div className='flight-popularFilter'>
              <h4>Price Filters</h4>
              <label htmlFor="below2k">
                  <input onChange={handlePriceFilter} value={priceFilter['below2k']} checked={priceFilter['below2k']} name='below2k' type="checkbox" id='below2k'/>
                  below ₹ 2000
                </label>
                <label htmlFor="between2kAnd4k">
                  <input onChange={handlePriceFilter} value={priceFilter['between2kAnd4k']} checked={priceFilter['between2kAnd4k']} name='between2kAnd4k' type="checkbox" id='between2kAnd4k'/>
                  ₹ 2000 - 4000
                </label>
                <label htmlFor="between4kand6k">
                  <input onChange={handlePriceFilter} value={priceFilter['between4kand6k']} checked={priceFilter['between4kand6k']} name='between4kand6k' type="checkbox" id='between4kand6k'/>
                  ₹ 4000 - 6000
                </label>
                <label htmlFor="above6k">
                  <input onChange={handlePriceFilter} value={priceFilter['above6k']} checked={priceFilter['above6k']} name='above6k' type="checkbox" id='above6k'/>
                  above ₹ 6000
                </label>
            </div>
          </div>
        </div>
        <div className='hotelList-container'>
          {
            filteredHotelList.length == 0 ? 
            <div style={{color:'white', textAlign:'center'}}>Oops No Hotel Found In This City!!</div> 
            :
            <ul className='hotel-card-container'>
              <li className='bold-text font24'>Showing Properties in {hotelCityRef.current}</li>
              <li className='hotel-sortAndFilter-btn'>
                <span onClick={()=>{
                  setShowFilterPortal(n=>!n)
                  }} ref={portalRef}>Filters
                </span>
                <span onClick={()=>{
                  setShowSortPortal(n=>!n)
                  }} ref={portalSortRef}>Sort</span>
              </li>
              {showFilterPortal && 
              <FilterPortal 
                handlePriceFilter={handlePriceFilter}
                priceFilter={priceFilter}
                setShowFilterPortal={setShowFilterPortal}
                portalRef={portalRef}
              />
              }
              {
                filteredHotelList.map((item) => (
                  <HotelCard key={item._id} hotel={item}/>
                ))
              }
            </ul>
          }
        </div>
      </div>
      </div>
  )
}

export default HotelSearch

function FilterPortal({portalRef, handlePriceFilter, priceFilter, setShowFilterPortal}){

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
            <div className='flight-filters' style={{top: '136px'}}>
              <div className='flight-popularFilter'>
                <h4>Price Filters</h4>
                <label htmlFor="below2k">
                  <input onChange={handlePriceFilter} value={priceFilter['below2k']} checked={priceFilter['below2k']} name='below2k' type="checkbox" id='below2k'/>
                  below ₹ 2000
                </label>
                <label htmlFor="between2kAnd4k">
                  <input onChange={handlePriceFilter} value={priceFilter['between2kAnd4k']} checked={priceFilter['between2kAnd4k']} name='between2kAnd4k' type="checkbox" id='between2kAnd4k'/>
                  ₹ 2000 - 4000
                </label>
                <label htmlFor="between4kand6k">
                  <input onChange={handlePriceFilter} value={priceFilter['between4kand6k']} checked={priceFilter['between4kand6k']} name='between4kand6k' type="checkbox" id='between4kand6k'/>
                  ₹ 4000 - 6000
                </label>
                <label htmlFor="above6k">
                  <input onChange={handlePriceFilter} value={priceFilter['above6k']} checked={priceFilter['above6k']} name='above6k' type="checkbox" id='above6k'/>
                  above ₹ 6000
                </label>
              </div>
              <div onClick={()=>{
                setShowFilterPortal(false)
              }} className='filter-apply-btn'>close</div>
              </div>
            </div>
          </div>
          </div>,
          document.body
        )
      }
    </>
  )
}