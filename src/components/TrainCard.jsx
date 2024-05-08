import React, { useState } from 'react'
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider'
import { useNavigate, createSearchParams } from 'react-router-dom'

function TrainCard({train, filters}) {

    const{trainBookingState} = useTrainBookingDetailsContext()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const navigate = useNavigate();
   

    function getNextDate(){
        const timeParts = train.departureTime.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const durationHourString = train.travelDuration.split(' ')[0];
        const addHour = parseInt(durationHourString.substring(0, durationHourString.length))
        const date = trainBookingState.travelDate.date
        const month = monthNames.indexOf(trainBookingState.travelDate.month)
        const year = trainBookingState.travelDate.year
        const startDate = new Date(year, month, date, hours, minutes)
        startDate.setHours(startDate.getHours() + addHour)
        // const newDate = startDate.getDay()
        return [startDate.getDay(), startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), addHour];
    }
    function handleNavigate(e, coach){

        navigate({
            pathname: `/railway/${train._id}`,
            search: createSearchParams({
                coachId: coach._id,
                nextday: getNextDate()[0],
                nextdate: getNextDate()[1],
                nextmonth: getNextDate()[2],
                nextyear: getNextDate()[3],
                duration: getNextDate()[4],
            }).toString()
        })
        
    }
  return (
    <div className='train-card'>
        <div className='train-details'>
            <div>
            <div>
                <h3>{train.trainName}</h3>
            </div>
            <div className='train-depart-days'>
                <span>#{train.trainNumber}</span>{" "}
                <span>|</span>{" "}
                <span>Departs on: {days.map((day, index)=>(
                <span key={index}
                    className={`${train.daysOfOperation.find(element=> element == day) ? 'trainOnDay' : ''} train-days`}
                >{day.substring(0,1)}</span>
                ))}</span>
            </div>
            </div>
            <div>
            <div>
                <h4>{train.departureTime}, {trainBookingState.travelDate.day.substring(0,3)}</h4>
            </div>
            <div className='source-station'>
                <span>{train.source}</span>
            </div>
            </div>
            <div>
            <div className='travel-duration'>
                <span>____ </span>
                <span>{train.travelDuration}</span>
                <span> ____</span>
            </div>
            </div>
            <div>
            <div>
                <h4>{train.arrivalTime}, {days[getNextDate()[0]]}</h4>
            </div>
            <div className='source-station'>
                <span>{train.destination}</span>
            </div>
            </div>
        </div>
        <div className='train-ticket-details'>
        <FIlteredCoaches train={train} filters={filters} handleNavigate={handleNavigate}/>
        </div>
    </div>
  )
}

export default TrainCard

function FIlteredCoaches({train, filters, handleNavigate}){

    const filterArr = Object.keys(filters).filter((filter)=>filters[filter])
    let filteredCoach = [...train.coaches]
    if(filterArr.indexOf('AC') >= 0){
        filteredCoach = filteredCoach.filter((coach)=>{
            if(filterArr.indexOf(coach.coachType) >= 0 || coach.coachType.indexOf('A') >= 0){
                return true;
            }
        })
    }
    else if(filterArr.length > 0){
        filteredCoach = filteredCoach.filter((coach)=>{
            if(filterArr.indexOf(coach.coachType) >= 0){
                return true;
            }
        })
    }
    return(
        <>
            {filteredCoach.length > 0 ?
            filteredCoach.map((coach,index)=>(
                <div key={index} onClick={(e)=>{
                    handleNavigate(e,coach)
                }} className='train-ticket-details-coaches'>
                    <div>
                    <span>{coach.coachType}</span>
                    <span>₹ {train.fare}</span>
                    </div>
                    <div>
                    <span>AVAILABLE {coach.numberOfSeats}</span>
                    </div>
                    <div>
                    <span>Free Cancellation</span>
                    </div>
                </div>
            ))
            :
            <div style={{textAlign:'center', width:'100%', color:'red'}}>
                No Seat Available For The Specific Class
            </div>
        }
        </>
    )
}