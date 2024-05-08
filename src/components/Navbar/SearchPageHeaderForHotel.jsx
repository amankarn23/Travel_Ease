import React, { useEffect, useRef, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer'
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer'
import { useHotelBookingDetailsContext } from '../../provider/HotelBookingDetailsProvider'
import getHotelList from '../../utils/getHotelList'
import { useHotelsListContext } from '../../provider/HotelsListProvider'
import HotelRoomAndTravellerModal from '../../Modals/HotelRoomAndTravellerModal'
import { createPortal } from 'react-dom'

function SearchPageHeaderForHotel({portalSortRef, showSortPortal, setShowSortPortal, setFilteredHotelList, hotelCityRef}) {
    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const{setHotelList} = useHotelsListContext()
    const [active, setActive] = useState(1);
    
    const [portal, setPortal] = useState(false)
    const [showPortal, setShowPortal] = useState(false)
    const portalRef = useRef()

    

    function handlePortalOnResize(){

        if(window.innerWidth <= 895){
          setPortal(true)
        }
        else{
            setPortal(false)
            setShowPortal(false)
        }
        if (window.innerWidth > 705){
            setShowSortPortal(false)
          }
    }
    
    useEffect(()=>{
        getHotelList(setHotelList ,hotelBookingState.city)
        window.addEventListener('resize', handlePortalOnResize)
        if(window.innerWidth <= 895){
            setPortal(true)
          }
        return ()=>{
            window.removeEventListener('resize', handlePortalOnResize)
          }
    },[])
    function handlePopularFilter(){
        setActive(1)
        getHotelList(setHotelList ,hotelBookingState.city)
    }
    function handleRatingFilter(){
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1,item2)=>item2.rating-item1.rating)
            return [...newList]
        })
        setActive(2)
    }
    function handlePriceHighestFirst(){
        setActive(3)
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1, item2)=>item2.rooms[0].costDetails.baseCost - item1.rooms[0].costDetails.baseCost)
            return [...newList]
        })
    }
    function handlePriceLowestFirst(){
        setActive(4)
        setFilteredHotelList((oldList)=>{
            const newList = oldList.sort((item1, item2)=>item1.rooms[0].costDetails.baseCost - item2.rooms[0].costDetails.baseCost)
            return [...newList]
        })
    }
  return (
    <>
    <div className='searchPage-header-container'>
        {!portal ? 
        <div className='makeFlex'>
        <section className='searchPage-booking-details-container'>
            <SearchPageLocationInputContainer
            inputId={'location'} 
            spanHeading={'City, Area Or Property'}
            value={hotelBookingState.city}
            dispatch={dispatchHotelBookingState}
            type={'hotelLocation'}
            modal={'hotel'}
            />
            <SearchPageCalendarInputContainer
            labelFor={'checkIn'}
            spanHeading={'Check-In'}
            value={hotelBookingState.checkIn}
            dispatch={dispatchHotelBookingState}
            type={'hotleCheckIn'}
            />
            <SearchPageCalendarInputContainer
            labelFor={'checkOut'}
            spanHeading={'Check-Out'}
            value={hotelBookingState.checkOut}
            dispatch={dispatchHotelBookingState}
            type={'hotleCheckOut'}
            />
            <SearchPageTravellerAndRoomInput
                value={hotelBookingState}
                dispatch={dispatchHotelBookingState}
            />
        </section>
        <section>
            <p className='makeFlex make-justify-center'>
                <button onClick={()=>{
                    getHotelList(setHotelList ,hotelBookingState.city)
                    hotelCityRef.current = hotelBookingState.city
                }} className='primaryBtn widgetSearchBtn bold-text' >SEARCH</button>
            </p>
        </section>
        </div>
        :
        <div ref={portalRef} className='responsive-search-bar'>
            <div>
                <p>{hotelBookingState.city}, India</p>
                <p>{hotelBookingState.checkIn.date} {hotelBookingState.checkIn.month} - {hotelBookingState.checkOut.date} {hotelBookingState.checkOut.month}, {hotelBookingState.room} Room(s), {hotelBookingState.adults} Adult(s)</p>
            </div>
            <div onClick={()=>{
                setShowPortal(true)
            }}>
                <img src="https://imgak.mmtcdn.com/flights/assets/media/mobile/common/xhdpi/edit_icon.png" alt="" />
                <span>Edit</span>
            </div>
        
        </div>
        }
      
        <div className='hotels-filter-bar'>
            <ul>
                <li className='bold-text'>SORT BY:</li>
                <li onClick={handlePopularFilter} className={`${active == 1 ? 'active' : ''} `}>
                    <span>Popular</span>
                </li>
                <li onClick={handleRatingFilter} className={`${active == 2 ? 'active' : ''}`}>
                    <span>User Rating (Highest First)</span>
                </li>
                <li onClick={handlePriceHighestFirst} className={`${active == 3 ? 'active' : ''}`}>
                    <span>Price (Highest First)</span>
                </li>
                <li onClick={handlePriceLowestFirst} className={`${active == 4 ? 'active' : ''}`}>
                    <span>Price (Lowest First)</span>
                </li>
            </ul>
        </div>
      </div>
      {showPortal && <SearchPortal portalRef={portalRef} setShowPortal={setShowPortal} hotelCityRef={hotelCityRef}/>}
        {showSortPortal && 
        <SortPortal
            portalSortRef={portalSortRef}
            setShowSortPortal={setShowSortPortal}
            handlePopularFilter={handlePopularFilter}
            active={active}
            handlePriceLowestFirst={handlePriceLowestFirst}
            handlePriceHighestFirst={handlePriceHighestFirst}
            handleRatingFilter={handleRatingFilter}
        />
        }
      </>
  )
}

export default SearchPageHeaderForHotel

export function SearchPageTravellerAndRoomInput({value, dispatch}){

    const [showModal, setShowModal] = useState(false)
    const myElementRef = useRef(null)
    return(
        <div ref={myElementRef} onClick={(e)=>{
            setShowModal(n=>!n)
          }}className='searchPage-booking-input'>
            <label htmlFor='rooms' className='searchPage-booking-inputBox'>
                <span className='dropdown'>Rooms & Guests</span>
                <div >
                <span >{value.room}</span>{' '}
                <span>{'Room'}</span>{', '}
                <span>{value.adults}</span>{' '}
                <span>{'Adults'}</span>
                </div>
            </label>
            {showModal && <HotelRoomAndTravellerModal myElementRef={myElementRef} setShowModal={setShowModal} value={value} dispatch={dispatch} search={true}/>}
        </div>
    )
}

function SearchPortal({hotelCityRef, portalRef, setShowPortal}){

    const {hotelBookingState, dispatchHotelBookingState} = useHotelBookingDetailsContext()
    const{setHotelList} = useHotelsListContext()
    const myElementRef = useRef()

    function handlePortal(e){
        if(!portalRef.current?.contains(e.target) && !myElementRef.current?.contains(e.target) && !e.target.classList.contains('cities')){
            setShowPortal(false);
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
                    <div ref={myElementRef} className='search-bar-portal-flight'>
                        <section className='searchPage-booking-details-container'>
                            <SearchPageLocationInputContainer
                            inputId={'location'} 
                            spanHeading={'City, Area Or Property'}
                            value={hotelBookingState.city}
                            dispatch={dispatchHotelBookingState}
                            type={'hotelLocation'}
                            modal={'hotel'}
                            />
                            <SearchPageCalendarInputContainer
                            labelFor={'checkIn'}
                            spanHeading={'Check-In'}
                            value={hotelBookingState.checkIn}
                            dispatch={dispatchHotelBookingState}
                            type={'hotleCheckIn'}
                            />
                            <SearchPageCalendarInputContainer
                            labelFor={'checkOut'}
                            spanHeading={'Check-Out'}
                            value={hotelBookingState.checkOut}
                            dispatch={dispatchHotelBookingState}
                            type={'hotleCheckOut'}
                            />
                            <SearchPageTravellerAndRoomInput
                                value={hotelBookingState}
                                dispatch={dispatchHotelBookingState}
                            />
                        </section>
                        <section>
                            <p className='makeFlex make-justify-center'>
                                <button onClick={()=>{
                                    getHotelList(setHotelList ,hotelBookingState.city)
                                    setShowPortal(false)
                                    hotelCityRef.current = hotelBookingState.city
                                }} className='primaryBtn widgetSearchBtn bold-text' >SEARCH</button>
                            </p>
                        </section>
                    </div>
                    </div>,
                    document.body
                )
            }
        </>
    )
}

function SortPortal({portalSortRef, setShowSortPortal,handlePriceLowestFirst, handlePriceHighestFirst, handleRatingFilter, handlePopularFilter, active}){
    
    const myElementRef = useRef()
    function handlePortal(e){
        
        if(!portalSortRef.current?.contains(e.target) && !myElementRef.current?.contains(e.target)){
            setShowSortPortal(false);
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
                    <div className='hotels-filter-bar responsive-sort-bar'>
                        <ul>
                            <li className='bold-text'>SORT BY:</li>
                            <li onClick={handlePopularFilter} className={`${active == 1 ? 'active' : ''} `}>
                                <span>Popular</span>
                            </li>
                            <li onClick={handleRatingFilter} className={`${active == 2 ? 'active' : ''}`}>
                                <span>User Rating (Highest First)</span>
                            </li>
                            <li onClick={handlePriceHighestFirst} className={`${active == 3 ? 'active' : ''}`}>
                                <span>Price (Highest First)</span>
                            </li>
                            <li onClick={handlePriceLowestFirst} className={`${active == 4 ? 'active' : ''}`}>
                                <span>Price (Lowest First)</span>
                            </li>
                        <div onClick={()=>{
                            setShowSortPortal(false)
                        }} className='filter-apply-btn'>close</div>
                        </ul>
             
                    </div>
                    </div>
                    </div>,
                    document.body
                )
            }
        </>
    )
}