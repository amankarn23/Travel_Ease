import React, { useEffect, useState } from 'react'
import './HotelRoomAndTravellerModal.css'

function HotelRoomAndTravellerModal({myElementRef, setShowModal, value, dispatch , search}) {

    const [adults, setAdults] = useState(value.adults)
    const [room, setRooms] = useState(value.room)

    function setModalFalse(e){
        if(!myElementRef.current.contains(e.target)){
            setShowModal(false)
        }
    }
    useEffect(()=>{
        document.body.addEventListener('click', setModalFalse)
        return ()=>{
            document.body.removeEventListener('click',setModalFalse);
        }
    },[])
    useEffect(()=>{
        dispatch({type: 'updateRoomAndTravellers', payload:{room, adults}})
    },[adults, room])
  return (
    <div onClick={(e)=>{
        e.stopPropagation()
     }}className={`hotel-passenger-hidden ${search ? 'hotel-passenger-hidden-search' : ''}`}>
      <div className='hotel--details-container'>
        <div>
            <span>Adults</span>
        </div>
        <div className="hotel--passanger-inc-dec-button">
         <svg onClick={(e)=>{
            setAdults(n=>{
               return n > 1 ? n-1 : 1
            })
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
         {adults}
         <svg onClick={(e)=>{
            setAdults(n=>n+1)
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
        </div>
      </div>
      <div className='hotel--details-container'>
      <div>
            <span>Rooms</span>
        </div>
        <div className="hotel--passanger-inc-dec-button">
         <svg onClick={(e)=>{
            setRooms(n=>{
               return n > 1 ? n-1 : 1
            })
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
         {room}
         <svg onClick={(e)=>{
            setRooms(n=>n+1)
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
        </div>
      </div>
    </div>
  )
}

export default HotelRoomAndTravellerModal
