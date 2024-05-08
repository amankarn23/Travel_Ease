import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { airportAndCity } from '../utils/airportNames'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'

const flightIcons = {
    '6E' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png?v=17", name: 'IndiGo'},
    'UK' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png?v=17", name: 'Vistara'},
    'AI' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=17", name: 'Air India'},
    'SG' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png?v=17", name: 'Spice Jet'},
    'G8' :{img: 'https://airhex.com/images/airline-logos/go-first.png', name: 'Go First'}
}

function FlightCard({flight}) {

    const navigate = useNavigate()
    const {flightBookingState} = useFlightBookingDetailsContext()

    function handleNavigation(){
        navigate({
            pathname: `/flight/${flight._id}`,
            search: createSearchParams({
                nextday: getNextDate()[0],
                nextdate: getNextDate()[1],
                nextmonth: getNextDate()[2],
                nextyear: getNextDate()[3],
                duration: getNextDate()[4],
            }).toString()
        })
    }
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    function getNextDate(){
        const timeParts = flight.departureTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const addHour = parseInt(flight.duration)
        const date = flightBookingState.travelDate.date
        const month = monthNames.indexOf(flightBookingState.travelDate.month)
        const year = flightBookingState.travelDate.year
        const startDate = new Date(year, month, date, hours, minutes)
        startDate.setHours(startDate.getHours() + addHour)
        return [startDate.getDay(), startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), addHour ];
    }
    function book(){
        if(window.innerWidth <= 470){
            handleNavigation()
        }
    }
  return (
    <li className='flight-card' onClick={book}>
        <div>
            <div className='flightIcon-container'>
                <img className='flightIcon' src={flightIcons[flight.flightID.slice(0,2)].img} alt="" />
                <div>
                    <h5>{flightIcons[flight.flightID.slice(0,2)].name}</h5>
                    <span className='font12'>{flight.flightID.slice(0,2) +" "+flight.flightID.slice(-3)}</span>
                </div>
            </div>
            <div>
                <h3>{flight.departureTime}</h3>
                <span>{airportAndCity[flight.source].city}</span>
            </div>
            <div>
                <span className='font12'>{`0${flight.duration} h`}</span>
                <span>{flight.stops ? flight.stops : 'Non'} stop</span>
            </div>
            <div>
                <h3>{flight.arrivalTime}</h3>
                <span>{airportAndCity[flight.destination].city}</span>
            </div>
            <div>
                <div>
                    <h3>₹ {flight.ticketPrice}</h3>
                    <span className='font12'>per traveller</span>
                </div>
                <div>
                    <span>{flight.availableSeats} seats left</span>
                    <button onClick={handleNavigation}>BOOK NOW</button>
                </div>
            </div>
        </div>
        <div>
            <p className='alertMsg'>Get Rs 150 off using MMTBONUS*</p>
        </div>
    </li>
  )
}

export default FlightCard
