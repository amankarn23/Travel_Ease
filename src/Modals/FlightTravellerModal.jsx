import React, { useEffect, useState } from 'react'
import './FlightTravellerModal.css'

const ticketClassArr = ['Economy', 'Business class', 'First class', 'Premium economy']
function FlightTravellerModal({setShowModal, value, dispatch , search}) {
   const [active, setActive] = useState(ticketClassArr.indexOf(value.ticketClass))
   const [adults, setAdults] = useState(value.travellers.adults);
   const [children, setChildren] = useState(value.travellers.children);
   const [infant, setInfant] = useState(value.travellers.infant);
   function updateTravellers(){
      dispatch({type: 'updateTravellers', payload: { ticketClass: ticketClassArr[active], travellers:{adults, children, infant}}})
   }
   // useEffect(()=>{
   //    return ()=>{
   //       updateTravellers()
   //    }
   // },[])
   useEffect(()=>{
      updateTravellers()
   },[adults, children, infant, active])
   function setModalFalse(e){
      setShowModal(false)
    }
    useEffect(()=>{
      document.addEventListener('click', setModalFalse)
      return ()=>{
        document.removeEventListener('click',setModalFalse);
      }
    },[])
  return (
   <div onClick={(e)=>{
      e.stopPropagation()
   }} className={`passanger-hidden-div ${search && 'passanger-hidden-div-search'}`}>
   <div className="passanger-div-section">
      <div className="passanger-text-content"><span><strong>Adults</strong></span><span style={{color: "rgb(128, 128, 128)"}}>(12+ years)</span></div>
      <div className="passanger-inc-dec-button">
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
   <div className="passanger-div-section">
      <div className="passanger-text-content"><span><strong>Children</strong></span><span style={{color: "rgb(128, 128, 128)"}}>(2 - 12 yrs)</span></div>
      <div className="passanger-inc-dec-button">
         <svg onClick={(e)=>{
            setChildren(n=>{
               return n > 0 ? n-1 : 0
            })
         }}stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
         {children}
         <svg onClick={(e)=>{
            setChildren(n=>n+1)
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
      </div>
   </div>
   <div className="passanger-div-section">
      <div className="passanger-text-content"><span><strong>Infants</strong></span><span style={{color: "rgb(128, 128, 128)"}}>(Below 2 yrs)</span></div>
      <div className="passanger-inc-dec-button">
         <svg onClick={(e)=>{
            setInfant(n=>{
               return n > 0 ? n-1 : 0
            })
         }}stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
         {infant}
         <svg onClick={(e)=>{
            setInfant(n=>n+1)
         }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="main-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
         </svg>
      </div>
   </div>
   <div className="passanger-div-section">
      <div>
         <div onClick={()=>{setActive(0)}} className={`class-buttons ${active == 0 && "selected-flight-class-button"}`}>Economy</div>
         <div onClick={()=>{setActive(1)}} className={`class-buttons ${active == 1 && "selected-flight-class-button"}`}>Business class</div>
      </div>
      <div>
         <div onClick={()=>{setActive(2)}} className={`class-buttons ${active == 2 && "selected-flight-class-button"}`}>First class</div>
         <div onClick={()=>{setActive(3)}} className={`class-buttons ${active == 3 && "selected-flight-class-button"}`}>Premium economy</div>
      </div>
   </div>
   </div>
  )
}

export default FlightTravellerModal
