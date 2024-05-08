import React from 'react'
import {createPortal} from 'react-dom'
import './SuccessFullBookingModal.css'
import { Link } from 'react-router-dom'
function SuccessFullBookingModal({setShowSuccessFullModal}) {
  return (
    <>
        {createPortal(
            <div onClick={()=>{
                setShowSuccessFullModal(false)
            }} className ="success-modal-container">
            <div onClick={(e)=>{
                e.stopPropagation()
            }} className ="success-modal">
                <div className ="success-image"><img src="https://www.kablooe.com/wp-content/uploads/2019/08/check_mark.png"/></div>
                <div className ="payment-successful">PAYMENT SUCCESSFUL</div>
                <Link className ="success-navlink" to="/mytrips">
                    <div className ="success-button">GO TO YOUR TRIPS</div>
                </Link>
                <p style={{padding: "0 1rem", textAlign: "center"}}>To view your travelling information, visit <strong>my trips</strong> in your profile section or simply click the above link to view your trips.</p>
            </div>
        </div>,document.body)}
    </>
  )
}

export default SuccessFullBookingModal
