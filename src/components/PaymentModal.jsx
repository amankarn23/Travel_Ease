import React, { useState } from 'react'

function PaymentModal({totalPrice, callback}) {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        year: '',
        month: '',
        cvv: ''
    })
    const [warning, setWarning] = useState('')
    function handlePayment(e){
        
        if(
            paymentDetails.cardHolder &&
            paymentDetails.cardNumber.length == 16 &&
            paymentDetails.year &&
            paymentDetails.month &&
            paymentDetails.cvv.length == 3
        ){
            callback()
        }
        else{
            setWarning('Please fill all information correctly.')
            setTimeout(()=>{
                setWarning("")
            },5000)
        }
    }
  return (
    <div className='payment-details'>
        <div className='payment-heading-container'>
            <img className='rupee-icon' src="https://t3.ftcdn.net/jpg/06/38/31/08/360_F_638310888_VQ6blDob0VuZohykQsEqbP622BpjTNWl.jpg" alt="" />
            <span>Payment Mode</span>
        </div>
        <div className='card-number-container'>
            <label htmlFor="card-number">Enter Your Card No.</label>
            <div>
                <input onChange={(e)=>{
                    setPaymentDetails({...paymentDetails, cardNumber: e.target.value.substring(0,16)});
                }} step="0.01" type="number" pattern="\d*" value={paymentDetails.cardNumber} placeholder='0000-0000-0000-0000' name="" id="card-number" />
                <div></div>
            </div>
        </div>
        <div className='card-holder-container'>
            <label htmlFor="card-holder">Enter Card Holder Name</label>
            <input onChange={(e)=>{
                setPaymentDetails({...paymentDetails, cardHolder: e.target.value});
            }}  type="text" placeholder='Card Holder Name' name="" id="card-holder" />
        </div>
        <div className='expiry-date-container'>
            <label htmlFor="expiry-date">Expiry Date</label>
            <div>
                <select name="month" onChange={(e)=>{
                    setPaymentDetails({...paymentDetails, month: e.target.value});
                }} id="month">
                    <option value="">Month</option>
                    <option value="01">January (01)</option>
                    <option value="02">February (02)</option>
                    <option value="03">March (03)</option>
                    <option value="04">April (04)</option>
                    <option value="05">May (05)</option>
                    <option value="06">June (06)</option>
                    <option value="07">July (07)</option>
                    <option value="08">August (08)</option>
                    <option value="09">September (09)</option>
                    <option value="10">October (10)</option>
                    <option value="11">November (11)</option>
                    <option value="12">December (12)</option>
                </select>
                <select name="year" onChange={(e)=>{
                    setPaymentDetails({...paymentDetails, year: e.target.value})
                }} id="year">
                    <option value="">Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
                <input type="password" onChange={(e)=>{
                    setPaymentDetails({...paymentDetails, cvv: e.target.value})
                }} maxLength={3} placeholder='CVV' />
            </div>
        </div>
        <span style={{marginLeft:'1rem' , fontSize:'12px', color:"red", fontWeight:"600"}}>{warning}</span>
        <div className='make-payment'>
            <div>
                <span>Total Fare: ₹ {totalPrice}</span>
                <button onClick={handlePayment}>Make Payment</button>
            </div>
        </div>
    </div>
  )
}

export default PaymentModal
