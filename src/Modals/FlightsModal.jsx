import React, { useState, useContext } from "react";
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import { AuthContext } from "./App";

const airports = [
    { "code": "BLR", "location": "Bangalore, IN - Kempegowda International Airport" },
    { "code": "BOM", "location": "Mumbai, IN - Chatrapati Shivaji Airport" },
    { "code": "DEL", "location": "New Delhi, IN - Indira Gandhi Airport" },
    { "code": "CCU", "location": "Kolkata, IN - Netaji Subhas Chandra Bose Airport" },
    { "code": "GOI", "location": "Goa, IN - Dabolim Airport" },
    { "code": "HYD", "location": "Hyderabad, IN - Rajiv Gandhi International" },
    { "code": "MAA", "location": "Chennai, IN - Chennai Airport" }
]

export default function FlightsModal() {

    const { departure, arrival, updateDeparture, updateArrival, flightDepartureHiddenDiv, setFlightDepartureHiddenDiv, flightArrivalHiddenDiv, setFlightArrivalHiddenDiv, setIsActive, setIsActivePassanger, setShowDate } = useContext(AuthContext);

    // const departureInputRef = useRef();
    // const arrivalInputRef = useRef();

    const handleDepartureInputChange = () => {
        const value = e.target.value;
        updateDeparture(value);
    };

    const handleArrivalInputChange = () => {
        const value = e.target.value;
        updateArrival(value);
    };

    const swapDepartureAndArrival = () => {
        const temp = departure;
        updateDeparture(arrival);
        updateArrival(temp);
    };

    const handleFlightDepartureHiddenDiv = () => {
        setFlightDepartureHiddenDiv(!flightDepartureHiddenDiv);

        if (flightArrivalHiddenDiv === true) {
            setFlightArrivalHiddenDiv(false);
        }

        setIsActive(false);
        setIsActivePassanger(false);
        setShowDate(false);
    }

    const handleFlightArrivalHiddenDiv = () => {
        setFlightArrivalHiddenDiv(!flightArrivalHiddenDiv);

        if (flightDepartureHiddenDiv === true) {
            setFlightDepartureHiddenDiv(false);
        }

        setIsActive(false);
        setIsActivePassanger(false);
        setShowDate(false);
    }

    const HandleDepartureHiddenDivClick = (e) => {
        const airportCode = e.currentTarget.getAttribute('data-airport-code');
        updateDeparture(airportCode);
        setFlightDepartureHiddenDiv(false);
    };

    const HandleArrivalHiddenDivClick = (e) => {
        const airportCode = e.currentTarget.getAttribute('data-airport-code');
        updateArrival(airportCode);
        setFlightArrivalHiddenDiv(false);
    };

    return (
        <div className='flight-des-arr-div'>
            <div className='dep-arr departure'>
                <GiAirplaneDeparture className='dep-arr-icon' />
                <input
                    placeholder='Where from?'
                    onChange={handleDepartureInputChange}
                    value={departure}
                    onClick={handleFlightDepartureHiddenDiv}
                />
            </div>

            {flightDepartureHiddenDiv && <div className='flight-hidden-div'>
                <div className='flight-location-container'>
                    {airports.map((airport) => (
                        <div key={airport.code} className='flight-info' onClick={HandleDepartureHiddenDivClick} data-airport-code={airport.code}>
                            <div className='flight-code'>{airport.code}</div>
                            <div className='flight-location'>{airport.location}</div>
                        </div>
                    ))}
                </div>
            </div>}
            <div className='svg-container' onClick={swapDepartureAndArrival}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="c-pointer"><rect width="32" height="32" rx="16" fill="white"></rect><g clip-path="url(#clip0_160_1650)"><path d="M24.1666 14.8333H7.83325" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.83325 14.8333L13.6666 9" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.83342 18.3335H24.1667" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24.1667 18.3334L18.3334 24.1667" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="16" cy="16" r="13.375" stroke="#3366CC" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></circle></g><defs><clipPath id="clip0_160_1650"><rect width="28" height="28" fill="white" transform="translate(2 2)"></rect></clipPath></defs></svg>
            </div>
            <div className='dep-arr arrival'>
                <GiAirplaneArrival className='dep-arr-icon arr-icon' />
                <input placeholder='Where to?'
                    onChange={handleArrivalInputChange}
                    value={arrival}
                    onClick={handleFlightArrivalHiddenDiv}
                />
            </div>

            {flightArrivalHiddenDiv && <div className='flight-arrival-hidden-div'>
                <div className='flight-location-container'>
                    {airports.map((airport) => (
                        <div key={airport.code} className='flight-info' onClick={HandleArrivalHiddenDivClick} data-airport-code={airport.code}>
                            <div className='flight-code'>{airport.code}</div>
                            <div className='flight-location'>{airport.location}</div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}