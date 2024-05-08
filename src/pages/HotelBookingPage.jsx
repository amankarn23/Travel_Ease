import React, { useEffect, useRef, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams, useSearchParams } from 'react-router-dom'
import getHotel from '../utils/getHotel';
import { useHotelBookingDetailsContext } from '../provider/HotelBookingDetailsProvider';
import { useLoginModalContext } from '../provider/LoginModalProvider';
import { useAuth } from '../provider/AuthProvider';
import PaymentModal from '../components/PaymentModal';
import { bookHotelTicket } from '../utils/bookHotel';
import SuccessFullBookingModal from '../Modals/SuccessFullBookingModal';

function HotelBookingPage() {

  const {isLoggedIn} = useAuth()
  const {setIsLoginModalVisible} = useLoginModalContext()
  const {hotelId} = useParams();
  const [hotel, setHotel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true);
  const [hotelName, setHotelName] = useState('');
  const [room, setRoom] = useState(null)
  const {hotelBookingState} = useHotelBookingDetailsContext()

  const checkInDate = new Date(`${hotelBookingState.checkIn.date}/${hotelBookingState.checkIn.month}/${hotelBookingState.checkIn.year}`)
  const checkOutDate = new Date(`${hotelBookingState.checkOut.date}/${hotelBookingState.checkOut.month}/${hotelBookingState.checkOut.year}`)
  const diffDate = Math.ceil(Math.abs(checkInDate-checkOutDate) / (1000*3600*24))
  const roomId = useRef(searchParams.get('roomId'));

  const [addAdults, setAddAdults] = useState([]);
  const [travellerLimitExceed, setTravellerLimitExceed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessFullModal, setShowSuccessFullModal] = useState(false)

  const emailRef = useRef()
  const phoneRef = useRef()
  const confirmRef = useRef()
  
  useEffect(()=>{
    getHotel(hotelId, setHotel, setHotelName, setLoading, roomId, setRoom)
  },[])
  function handleAddTraveller(){
    if(addAdults.length < hotelBookingState.adults){
        setAddAdults(oldValue=>{
            return [...oldValue, {
                firstName: "",
                lastName: "",
                gender: ""
            }]
        })
    }
    else{
        setTravellerLimitExceed(true)
        setTimeout(()=>{
            setTravellerLimitExceed(false)
        },5000)
    }
}
function showMsg(text){
  setErrorMsg(text)
  setTimeout(()=>{
    setErrorMsg('')
  },5000)
}
function checkDetails(){
  if(addAdults.length < hotelBookingState.adults){
    showMsg('Please add all the guest(s).')
    return
  }
  for(const element of addAdults){
    for(const property in element){
        if(!element[property]){
          showMsg('Please provide valid guest(s) name and gender.')
            return null;
        }
    }
  }
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!emailRegex.test(emailRef.current.value)){
    showMsg('please provide a valid email.')
    return;
  }
  const phoneRegex = /^\d{10}$/;
  if(!phoneRegex.test(phoneRef.current.value)){
    showMsg('please provide a valid 10 digits number.')
    return;
  }
  if(!confirmRef.current.checked){
    showMsg('Please confirm.');
    return;
  }
  if(isLoggedIn){
    setShowPaymentModal(true)
  }
  else{
    setIsLoginModalVisible(true)
  }
}
function bookTicket(){
  bookHotelTicket(hotelId, hotelBookingState, setShowSuccessFullModal, setShowPaymentModal, setAddAdults, emailRef, phoneRef, confirmRef)
}
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Review your booking</h2>
      </div>
      {loading ?
        <div>Loading...</div>
        :
        <div className='hotelBookingPage-bookingDetails-container'>
          <div>
            <div className='hotelBookingPage-bookingDetails'>
              <div className='hotelBookingPage-hotelDetails'>
                <div>
                    <span>{hotelName}</span>
                    <span>
                      <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/ic_star_selected.png" alt="" />
                      <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/ic_star_selected.png" alt="" />
                      <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/ic_star_selected.png" alt="" />
                      <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/ic_star_selected.png" alt="" />
                      <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/ic_star_selected.png" alt="" />
                    {hotel.houseRules.guestProfile.unmarriedCouplesAllowed && 
                      <span>Couple Friendly</span>
                    }
                    </span>
                </div>
                <div>
                  <img src={hotel.images[0]} alt="" />
                </div>
              </div>
              <div className='hotelBookingPage-checkoutDetails'>
                <div className='checkinAndCheckout-date'>
                  <span>CHECK IN</span>
                  <span>
                    {hotelBookingState.checkIn.day.substring(0,3)}
                    <span> {hotelBookingState.checkIn.date} {hotelBookingState.checkIn.month} </span>
                    {hotelBookingState.checkIn.year}
                  </span>
                  <span>2 PM</span>
                </div>
                <div className='diffDate'>{diffDate} {diffDate > 1 ? 'NIGHTS' : 'NIGHT'}</div>
                <div className='checkinAndCheckout-date'>
                  <span>CHECK OUT</span>
                  <span>
                    {hotelBookingState.checkOut.day.substring(0,3)}
                    <span> {hotelBookingState.checkOut.date} {hotelBookingState.checkIn.month} </span>
                    {hotelBookingState.checkOut.year}
                  </span>
                  <span>12 PM</span>
                </div>
                <div>
                  <p><b>{diffDate}</b> {diffDate > 1 ? 'NIGHTS' : 'NIGHT'} | <b>{hotelBookingState.adults}</b> {hotelBookingState.adults > 1 ? 'Adults' : 'Adult'} | <b>{hotelBookingState.room}</b> {hotelBookingState.room > 1 ? 'Rooms' : 'Room'}</p>
                </div>
              </div>
              <div className='hotelBooking-roomDetails'>
                <p>{hotelName} Executive {room.roomType}, {room.bedDetail.split(' ')[1]} Bed with Sit out Living Room/ Seperate Dining Area and Bathtub</p>
                <span style={{color: 'grey'}}>{hotelBookingState.adults} {hotelBookingState.adults > 1 ? 'Adults' : 'Adult'}</span>
                <ul>
                  <li>Room with Breakfast</li>
                  <li>Free Breakfast</li>
                  <li><span style={{color: 'red'}}>Non-Refundable</span> | On Cancellation, You will not get any refund</li>
                </ul>
              </div>
              <div className='hotelBooking-importantInfo'>
                    <h3>Important Information</h3>
                    <ul>
                      <li>Guests below 18 years of age are not allowed at the property.</li>
                      <li>{hotel.houseRules.restrictions.idProofsAccepted.map((id,index)=>(
                          <span key={index}>{id}, </span>
                        ))
                        } are accepted ID proof(s).
                      </li>
                      <li>Pets are {hotel.houseRules.restrictions.petsAllowed ? null: 'not'} allowed.</li>
                      <li>Outside food is not allowed.</li>
                    </ul>
              </div>
            </div>
            <div className='hotelBookingPage-guestDetails-container'>
              <div className='hotelBookingPage-guestDetails-heading'>
                <span>Guest Details </span>
                {travellerLimitExceed && <span style={{fontSize:'10px', color:'red', fontWeight:'400'}}>You have already selected {hotelBookingState.adults} ADULT. Remove before adding a new one.</span>}
              </div>
              <div className='flightBookingPage-userNameAndGender'>
                  {!addAdults.length && <div>
                      <span className='font12'>You have not added any adults to the list</span>
                  </div>}
                  {
                      addAdults.map((item, index)=>(
                          <UserNameAndGender key={index} traveller={item} index={index} setAddAdults={setAddAdults}/>
                      ))
                  }
                  <div>
                      <button onClick={handleAddTraveller}>
                          + ADD GUEST
                      </button>
                  </div>
              </div>
              <div className='hotelBookingPage-contact-details'>
                <div>
                  <p>EMAIL ADDRESH</p>
                  <div><input ref={emailRef}  placeholder='Email ID' type="email" /></div>
                </div>
                <div>
                  <p>MOBILE NUMBER</p>
                  <div><span>+91</span><input  ref={phoneRef} step={0.01} placeholder='Contact Number' type="number" /></div>
                </div>
              </div>
              <div className='hotelBooking-confirm'>
                <input ref={confirmRef} id='confirm' type="checkbox" />
                <label htmlFor="confirm">Confirm</label>
              </div>
            </div>
            <div className='hotelBooking-price-details responsive-hotelBooking-price-details'>
                <h4>Price Breakup</h4>
                <div className='hotelBooking-room-price'>
                  <div>
                    <span>{hotelBookingState.room} {hotelBookingState.room > 1 ? 'Rooms' : 'Room'} x {diffDate} {diffDate > 1 ? 'Nights' : 'Night'}</span>
                    <span>Base Price</span>
                  </div>
                  <div>
                    <span>₹ {room.costDetails.baseCost * diffDate * hotelBookingState.room}</span>
                  </div>
                </div>
                <div className='hotelBooking-room-tax'>
                  <div>
                    <span>Hotel Taxes</span>
                    <span>₹ {room.costDetails.taxesAndFees}</span>
                  </div>
                </div>
                <div className='hotelBooking-room-totalPrice'>
                  <div>
                    <span>Total Amount to be paid</span>
                    <span>₹ {room.costDetails.baseCost * diffDate * hotelBookingState.room + room.costDetails.taxesAndFees}</span>
                  </div>
                </div>
            </div>
            {!showPaymentModal && <div>
              <div className='hotelBooking-errorMsg'>{errorMsg}</div>
              <button onClick={checkDetails} className='hotelBooking-payNow-button'>
                PAY NOW
              </button>
            </div>}
            
            {showPaymentModal && <PaymentModal totalPrice={room.costDetails.baseCost * diffDate * hotelBookingState.room + room.costDetails.taxesAndFees} callback={bookTicket}/>}
          </div>
          <div>
            <div className='non-scrollable'>
              <div className='hotelBooking-price-details'>
                  <h4>Price Breakup</h4>
                  <div className='hotelBooking-room-price'>
                    <div>
                      <span>{hotelBookingState.room} {hotelBookingState.room > 1 ? 'Rooms' : 'Room'} x {diffDate} {diffDate > 1 ? 'Nights' : 'Night'}</span>
                      <span>Base Price</span>
                    </div>
                    <div>
                      <span>₹ {room.costDetails.baseCost * diffDate * hotelBookingState.room}</span>
                    </div>
                  </div>
                  <div className='hotelBooking-room-tax'>
                    <div>
                      <span>Hotel Taxes</span>
                      <span>₹ {room.costDetails.taxesAndFees}</span>
                    </div>
                  </div>
                  <div className='hotelBooking-room-totalPrice'>
                    <div>
                      <span>Total Amount to be paid</span>
                      <span>₹ {room.costDetails.baseCost * diffDate * hotelBookingState.room + room.costDetails.taxesAndFees}</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
      }
      {showSuccessFullModal && <SuccessFullBookingModal setShowSuccessFullModal={setShowSuccessFullModal}/>}
    </div>
  )
}

export default HotelBookingPage

function UserNameAndGender({setAddAdults, index, traveller}){

  function handleInput(e){
      setAddAdults((prev) =>{
          const name = e.target.name;
          prev[index][name] = e.target.value;
          return [...prev];
      })
  }
  function handleGender(e){
      setAddAdults((prev) =>{
          prev[index].gender = e.target.innerText;
          return [...prev];
      })
  }
  return(
      <>
          <span style={{paddingLeft:'0.6rem', paddingTop:'0.6rem', display:"inline-block"}}>GUEST {index+1}</span>
          <div className='flightBookingPage-userNameAndGender-input-container'>
              <div>
                  <input onChange={handleInput} name='firstName' type="text" value={traveller.firstName} placeholder='First & Middle Name'/>
              </div>
              <div>
                  <input onChange={handleInput} name="lastName" type="text" value={traveller.lastName} placeholder='Last Name'/>
              </div>
              <div>
                  <span onClick={handleGender} className={`${traveller.gender == 'MALE' && 'genderActive'}`}>MALE</span>
                  <span onClick={handleGender} className={`${traveller.gender == 'FEMALE' && 'genderActive'}`}>FEMALE</span>
              </div>
          </div>
      </>
  )
}