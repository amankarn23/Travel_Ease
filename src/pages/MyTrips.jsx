import React, { useEffect, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import './MyTrips.css'
import { getMyTrips } from '../utils/getMyTrips'
import { Link } from 'react-router-dom'

function MyTrips() {

    const [allTrips, setAllTrips] = useState([])
    const [activeValue, setActiveValue] = useState(0)
    useEffect(()=>{
        getMyTrips(setAllTrips)
        
    },[])
  return (

    <div>
      <SearchNavbar/>
      <div className='mytrips-main-container'>
        <div className={`mytrips-background-style ${activeValue == 0 ? '' : 'mytrips-background-style-completed'}`}>
            <div>
                <span>My Account {'>'} </span>
                <span>My Trips</span>
            </div>
        </div>
        <div className='mytrips-container'>
            <div className='mytrips-history-container'>
                <div className='heading-container'>
                    <div className='heading' onClick={()=>{
                        setActiveValue(0)
                    }}>
                        <span className={`upcomingIcon ${activeValue == 0 ? 'upcomingIcon-active':''}`}></span>
                        <span>UPCOMING</span>
                    </div>
                    <div className='heading' onClick={()=>{
                        setActiveValue(1)
                    }}>
                        <span className={`completedIcon ${activeValue == 1 ? 'completedIcon-active':''}`}></span>
                        <span>COMPLETED</span>
                    </div>
                </div>
                <div className='myTrips'>
                    <ul id="upcoming">
                        {activeValue == 0 ?
                        <>
                            {
                                allTrips.filter((item,index)=>{
                                    if(compareDate(item.start_date)){
                                        return true
                                    }
                                }).length == 0 ? <EmptyList/> 
                                : 
                                allTrips.filter((item,index)=>{
                                    if(compareDate(item.start_date)){
                                        return true
                                    }
                                }).map((item, index)=>(
                                    <Trips key={item._id} item={item}/>
                                ))
                            }
                        </>
                        :
                        <>
                            {
                                allTrips.filter((item,index)=>{
                                    if(!compareDate(item.start_date)){
                                        return true
                                    }
                                }).length == 0 ? <EmptyList/>
                                :
                                allTrips.filter((item,index)=>{
                                    if(!compareDate(item.start_date)){
                                        return true
                                    }
                                }).map((item, index)=>(
                                    <Trips key={item._id} item={item}/>
                                ))
                            }
                        </>}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    
    </div>
  )
}

export default MyTrips

function Trips({item}){
    return(
        <li className={`bookings ${item.booking_type == 'flight' ? 'item-flight' : ''}${item.booking_type == 'bus' ? 'item-train' : ''}${item.booking_type == 'hotel' ? 'item-hotel' : ''}`}>
            <div>
                {item.booking_type == 'flight' && <div className='booking-icon-container'><span className='bookings-flightIcon'></span> <span>Flight</span></div>}
                {item.booking_type == 'hotel' && <div className='booking-icon-container'><span className='bookings-hotelIcon'></span> <span>Hotel</span></div>}
                {item.booking_type == 'bus' && <div className='booking-icon-container'><span className='bookings-trainIcon'></span> <span>Train</span></div>}
            </div>
            <div className='light-color-text'>
                <span>Booked On : </span>
                <DateFormater date={item.created_at}/>
            </div>
            <div>
                {(item.booking_type == 'flight' || item.booking_type == 'bus') && 
                    <div className='light-color-text'>
                    <span>Departure : </span>
                    <DateFormater date={item.start_date}/>
                    </div>
                }
                {item.booking_type == 'hotel' && 
                    <div className='light-color-text'>
                    <span>Check In : </span>
                    <DateFormater date={item.start_date}/>
                    </div>
                }
            </div>
            <div>
            {(item.booking_type == 'flight' || item.booking_type == 'bus') && 
                    <div className='light-color-text'>
                    <span>Arrival : </span>
                    <DateFormater date={item.end_date}/>
                    </div>
                }
                {item.booking_type == 'hotel' && 
                    <div className='light-color-text'>
                    <span>Check Out : </span>
                    <DateFormater date={item.end_date}/>
                    </div>
                }
            </div>
        </li>
    )
}

function DateFormater({date}){
    const inputDate = new Date(date)
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; 
    const year = inputDate.getFullYear();
    const formattedDate = day + '/' + month + '/' + year%100;
    return(
        <span>
            {formattedDate}
        </span>
    )
}

function compareDate(date){

    const inputDate = new Date(date);
    const currentDate = new Date();
    if (inputDate > currentDate) {
        return true;
    }
    return false
}
function EmptyList(){
    return(
        <div className='myTrips-empty'>
            <div>
                <img src="https://imgak.mmtcdn.com/mima/images/Desktop/upcoming-empty.png" alt="" />
            </div>
            <div>
                <p>Looks empty, you've no upcoming bookings.</p>
                <p>When you book a trip, you will see your itinerary here.</p>
                <Link to='/'>
                    <button>PLAN A TRIP</button>
                </Link>
            </div>
        </div>
    )
}