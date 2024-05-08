import React, { useEffect, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams, useSearchParams } from 'react-router-dom'
import getFlight from '../utils/getFlight'
import { airportAndCity} from '../utils/airportNames'
import { useFlightBookingDetailsContext } from '../provider/FlightBookingDetailsProvider'
import PaymentModal from '../components/PaymentModal'
import { useAuth } from '../provider/AuthProvider'
import { useLoginModalContext } from '../provider/LoginModalProvider'
import { bookTrainTicket } from '../utils/bookTrain'
import { bookFlightTicket } from '../utils/bookFlight'
import SuccessFullBookingModal from '../Modals/SuccessFullBookingModal'

const flightIcons = {
    '6E' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png?v=17", name: 'IndiGo'},
    'UK' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png?v=17", name: 'Vistara'},
    'AI' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png?v=17", name: 'Air India'},
    'SG' :{img: "https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png?v=17", name: 'Spice Jet'},
    'G8' :{img: 'https://airhex.com/images/airline-logos/go-first.png', name: 'Go First'}
}

function FlightBookingPage() {

    const [searchParams, setSearchParams] = useSearchParams()
    const {isLoggedIn} = useAuth()
    const {setIsLoginModalVisible} = useLoginModalContext()

    const {flightId} = useParams()
    const [flight, setFlight] = useState(null)
    const [loading, setLoading] = useState(true);
    const {flightBookingState} = useFlightBookingDetailsContext()

    const [showBaseFare, setShowBaseFare] = useState(false)
    const [showTaxes, setShowTaxes] = useState(false)

    const [showStateModal, setShowStateModal] = useState(false);
    const [stateValue, setStateValue] = useState("");

    const [addedTravellers, setAddedTravellers] = useState([]);
    const [travellerLimitExceed, setTravellerLimitExceed] = useState(false);
    const [bookingDetailsSentTo, setBookingDetailsSentTo] = useState({
        number:"",
        email:""
    })
    const [address, setAddress] = useState({
        pincode:"",
        state:"",
        address:"",
        checked: false
    })
    const [checkAllField, setCheckAllField] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showSuccessFullModal, setShowSuccessFullModal] = useState(false)

    useEffect(()=>{
        document.addEventListener('click',()=>{
            setShowStateModal(false)
        })
        getFlight(flightId, setFlight, setLoading)
        document.body.style.backgroundColor = '#E5EEF4'
        return ()=>{
        document.body.style.backgroundColor = ''
        }
    },[])
    function handleBaseFare(){
        setShowBaseFare(!showBaseFare)
    }
    function handleTaxes(){
        setShowTaxes(!showTaxes)
    }
    function handleAddTraveller(){
        if(addedTravellers.length < (flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)){
            setAddedTravellers(oldValue=>{
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
    function showMsg(){
        setCheckAllField(true);
        setTimeout(()=>{
            setCheckAllField(false);
        },5000)
    }
    function checkDetails(){

        if(addedTravellers.length != (flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)){
            showMsg();
            return null;
        }
        for(const property in bookingDetailsSentTo){
            if(!bookingDetailsSentTo[property]){
                showMsg();
                return;
            }
        }
        for(const property in address){
            if(!address[property] && property != 'address'){;
                showMsg();
                return;
            }
        }
        for(const element of addedTravellers){
            for(const property in element){
                if(!element[property]){
                    showMsg();
                    return null;
                }
            }
        }
        if(isLoggedIn){
            setShowPaymentModal(true)
        }
        else{
            setIsLoginModalVisible(true)
        }
        
    }
    function bookTicket(){
        bookFlightTicket(flightId, flightBookingState , {date:searchParams.get('nextdate'), month: searchParams.get('nextmonth'), year: searchParams.get('nextyear')}, setShowSuccessFullModal, setShowPaymentModal, setAddedTravellers, setBookingDetailsSentTo, setAddress)
    }
    
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Complete your booking</h2>
      </div>
      {loading ?
        <div>Loading...</div>
        :
        <div className='flightBookingPage-bookingDetails-container'>
            <div>
                <div className='flightBookingPage-bookingDetails'>
                    <div>
                        <div>
                            <span style={{textTransform:'capitalize', fontSize:'18px', fontWeight:'700'}}>{airportAndCity[flight.source].city} → {airportAndCity[flight.destination].city}</span>
                            <div>
                                <span style={{backgroundColor:'#FFEDD1', padding:'0px 4px', fontWeight:'500'}}>{flightBookingState.travelDate.day}, {flightBookingState.travelDate.month} {flightBookingState.travelDate.date}</span>{' '}
                                <span style={{fontSize:'14px'}}>{flight.stops ? flight.stops : 'Non'} stop · {`${flight.duration} h`}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img style={{width:'28px', height:'28px'}} src={flightIcons[flight.flightID.slice(0,2)].img} alt="" />
                                <span style={{fontWeight:'500'}}>{flightIcons[flight.flightID.slice(0,2)].name}</span>
                                <span >{flight.flightID.slice(0,2) +" "+flight.flightID.slice(-3)}</span>
                                <span style={{marginRight: '0.5rem', border:'1px solid grey', borderRadius:'12px', fontSize:'12px', fontWeight:'500', padding:'0 8px', color:'grey'}}>Airbus A320</span>
                            </div>
                            <div>
                                <span>{flightBookingState.ticketClass}</span> {/*make dynamic*/}
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <span style={{fontWeight:'500'}}>{flight.departureTime}</span>
                                    <span></span>
                                    <span style={{fontWeight:'500', textTransform:'capitalize'}}>{airportAndCity[flight.source].city} ({flight.source})</span>
                                </div>
                                <div>
                                    <span style={{fontSize:'14px'}}>{flight.duration}h</span>
                                </div>
                                <div>
                                    <span style={{fontWeight:'500'}}>{flight.arrivalTime}</span>
                                    <span></span>
                                    <span style={{fontWeight:'500', textTransform:'capitalize'}}>{airportAndCity[flight.destination].city} ({flight.destination})</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img style={{width:'24px', height:'24px'}} src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/cabin_baggage_icon.png" alt="" />
                                    <span><b>Cabin Baggage:</b> 7 Kgs (1 piece only) / Adult</span>
                                </div>
                                <div>
                                    <img style={{width:'24px', height:'24px'}} src="https://imgak.mmtcdn.com/flights/assets/media/dt/review/checkin_baggage_icon.png" alt="" />
                                    <span><b>Check-In Baggage:</b> 15 Kgs (1 piece only) / Adult</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flightBookingPage-imp-info'>
                    <h3>Important Information</h3>
                    <div>
                        <img style={{width:'20px', height:'20px', marginRight:'10px'}} src="https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/imp-info.png" alt="" />
                        <h5>Check travel guidelines and baggage information below:</h5>
                    </div>
                    <ul>
                        <li><span>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.</span></li>
                        <li><span>Wearing a mask/face cover is no longer mandatory. However, all travellers are advised to do so as a precautionary measure.</span></li>
                    </ul>
                </div>
                <div className='flightBookingPage-userDetails'>
                    <h3>Traveller Details</h3>
                    <div>
                        <div className='flightBookingPage-traveller-icon-container'>
                            <img style={{width:'28px'}} src="	https://imgak.mmtcdn.com/flights/assets/media/dt/rta_assets/traveller-placeholder2.png" alt="" />
                            <span>Traveller</span>
                            {travellerLimitExceed && <span style={{fontSize:'10px'}}>You have already selected {flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant} ADULT. Remove before adding a new one.</span>}
                        </div>
                        <div>
                            <span>{addedTravellers.length}/{flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant}</span>
                            <span> added</span>
                        </div>
                    </div>
                    <div>
                        <span>Important: </span>
                        <span>Enter name as mentioned on your passport or Government approved IDs.</span>
                    </div>
                    <div className='flightBookingPage-userNameAndGender'>
                        {!addedTravellers.length && <div>
                            <span className='font12'>You have not added any adults to the list</span>
                        </div>}
                        {
                            addedTravellers.map((item, index)=>(
                                <UserNameAndGender key={index} traveller={item} index={index} setAddedTravellers={setAddedTravellers}/>
                            ))
                        }
                        <div>
                            <button onClick={handleAddTraveller}>
                                + ADD NEW TRAVELLER
                            </button>
                        </div>
                    </div>
                    <div className='flightBookingPage-details-sent-to'>
                        <div>
                            <span>Booking details will be sent to </span>
                        </div>
                        <div>
                            <div>
                                <span>Country Code</span>
                                <input type="text" readOnly disabled value={'India(91)'}/>
                            </div>
                            <div>
                                <span>Mobile No</span>
                                <input onChange={(e)=>{
                                    setBookingDetailsSentTo(prev=>{
                                        return {...prev, number: e.target.value}
                                    })
                                }} value={bookingDetailsSentTo.number} style={{caretColor:"ActiveBorder"}} type="text" placeholder='Mobile No' />
                            </div>
                            <div>
                                <span>Email</span>
                                <input onChange={(e)=>{
                                    setBookingDetailsSentTo(prev=>{
                                        return {...prev, email: e.target.value}
                                    })
                                }} value={bookingDetailsSentTo.email} type="email" placeholder='Email' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flightBookingPage-pincodeAndState'>
                    <div>
                        <span>Your pincode and state </span>
                        <span>(Required for generating your invoice.)</span>
                    </div>
                    <div>
                        <div>
                            <span>Pincode</span>
                            <input onChange={(e)=>{
                                setAddress(prev=>{
                                    return {...prev, pincode: e.target.value}
                                })
                            }} value={address.pincode} type="text" placeholder='Postal Code'/>
                        </div>
                        <div>
                            <span>State</span>
                            <input type="text" readOnly placeholder='Your State'  onClick={(e)=>{
                                e.stopPropagation();
                                setShowStateModal(true)
                            }} value={stateValue}/>
                            <span className={showStateModal ? 'dropdown-active': 'dropdown'}></span>
                            {showStateModal && <StateModal setStateValue={setStateValue} stateValue={stateValue} setAddress={setAddress}/>}
                        </div>
                        <div>
                            <span>Address</span>
                            <input onChange={(e)=>{
                                setAddress(prev=>{
                                    return {...prev, address: e.target.value}
                                })
                            }} value={address.address} type="text" placeholder='Your Address (Optional)' />
                        </div>
                    </div>
                    <div>
                        <input onChange={(e)=>{
                            setAddress(prev=>{
                               
                                return {...prev, checked: e.target.checked}
                            })
                        }} type="checkbox" checked={address.checked} name="" id="confirm" />
                        <label style={{paddingLeft:"4px", fontSize:"14px", cursor:"pointer"}} htmlFor="confirm">Confirm</label>
                    </div>
                </div>
                <div className='flightBookingPage-fareDetails responsive-flightBookingPage-fareDetails'>
                    <h3>Fare Summary</h3>
                    <div onClick={handleBaseFare}>
                        <div>
                            <div>
                                {!showBaseFare ? 
                                    <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_expand.68dc8068.png" alt="" />
                                    :
                                    <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_collapse.83c3e92a.png" alt=""/>
                                }
                                <span>Base Fare</span>
                            </div>
                            {!showBaseFare && 
                                <div>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice}</div> 
                            }{/**price depend on number of travellers */}
                        </div>
                        {showBaseFare && 
                            <div>
                                <span> Traveller(s) ({`${flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant} X ₹ ${flight.ticketPrice}`})</span>
                                <div>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice}</div>
                            </div>
                        }
                    </div>
                    <div onClick={handleTaxes}>
                        <div>
                            <div>
                                {!showTaxes ? 
                                    <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_expand.68dc8068.png" alt="" />
                                    :
                                    <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_collapse.83c3e92a.png" alt=""/>
                                }
                                <span>Taxes and Surcharges</span>
                            </div>
                            {!showTaxes &&<div>₹ {parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</div>} 
                        </div>
                        {showTaxes && <div>
                            <span>Airline Taxes and Surcharges</span>
                            <div>₹ {parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</div>
                        </div>}
                    </div>
                    <div>
                        <span>Total Amount</span>
                        <span>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice + parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</span>
                    </div>
                </div>
                <div>
                    {checkAllField && !showPaymentModal && <span style={{fontSize:'10px', color:"red", fontWeight:"600"}}>Please provide all details mentioned above.</span>}<br/>
                    <button onClick={checkDetails} className='flightBookingPage-submitBtn'>
                        CONTINUE
                    </button>
                </div>
                {showPaymentModal && <PaymentModal totalPrice={(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice + parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)} callback={bookTicket}/>}
            </div>
            <div>
                <div className='non-scrollable'>
                    <div className='flightBookingPage-fareDetails'>
                        <h3>Fare Summary</h3>
                        <div onClick={handleBaseFare}>
                            <div>
                                <div>
                                    {!showBaseFare ? 
                                        <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_expand.68dc8068.png" alt="" />
                                        :
                                        <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_collapse.83c3e92a.png" alt=""/>
                                    }
                                    <span>Base Fare</span>
                                </div>
                                {!showBaseFare && 
                                    <div>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice}</div> 
                                }{/**price depend on number of travellers */}
                            </div>
                            {showBaseFare && 
                                <div>
                                    <span> Traveller(s) ({`${flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant} X ₹ ${flight.ticketPrice}`})</span>
                                    <div>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice}</div>
                                </div>
                            }
                        </div>
                        <div onClick={handleTaxes}>
                            <div>
                                <div>
                                    {!showTaxes ? 
                                        <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_expand.68dc8068.png" alt="" />
                                        :
                                        <img className='flightBookingPage-addIcon' src="https://jsak.mmtcdn.com/flights/assets/media/ic_collapse.83c3e92a.png" alt=""/>
                                    }
                                    <span>Taxes and Surcharges</span>
                                </div>
                                {!showTaxes &&<div>₹ {parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</div>} 
                            </div>
                            {showTaxes && <div>
                               <span>Airline Taxes and Surcharges</span>
                               <div>₹ {parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</div>
                            </div>}
                        </div>
                        <div>
                            <span>Total Amount</span>
                            <span>₹ {(flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice + parseInt(((flightBookingState.travellers.adults + flightBookingState.travellers.children + flightBookingState.travellers.infant)*flight.ticketPrice*5)/100)}</span>
                        </div>
                    </div>
                    {/**Add coupons here */}
                </div>
            </div>
        </div>
      }
      {showSuccessFullModal && <SuccessFullBookingModal setShowSuccessFullModal={setShowSuccessFullModal}/>}
    </div>
  )
}

function UserNameAndGender({setAddedTravellers, index, traveller}){

    function handleInput(e){
        setAddedTravellers((prev) =>{
            const name = e.target.name;
            prev[index][name] = e.target.value;
            return [...prev];
        })
    }
    function handleGender(e){
        setAddedTravellers((prev) =>{
            prev[index].gender = e.target.innerText;
            return [...prev];
        })
    }
    return(
        <>
            <span style={{paddingLeft:'0.6rem', paddingTop:'0.6rem', display:"inline-block"}}>TRAVELLER {index+1}</span>
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

function StateModal({setStateValue, stateValue, setAddress}){
    const states = [
        'Haryana',
        'Andaman and Nicobar',
        'Delhi',
        'Dadra and Nagar Haveli',
        'Chhattisgarh',
        'Assam',
        'Arunachal Pradesh',
        'Nagaland',
        'Ladakh',
        'Lakshadweep',
        'Northern Areas',
        'Telangana',
        'Sikkim',
        'West Bengal',
        'Jharkhand',
        'Meghalaya',
        'Odisha',
        'Uttarakhand',
        'Jammu and Kashmir',
        'Tripura',
        'Mizoram',
        'Rajasthan',
        'Manipur',
        'Gujarat',
        'Goa',
        'Bihar',
        'Andhra Pradesh',
        'Karnataka',
        'Daman and Diu',
        'Maharashtra',
        'Madhya Pradesh',
        'Uttar Pradesh',
        'Kerala',
        'Chandigarh',
        'Tamil Nadu',
        'Puducherry',
        'Punjab',
        'Himachal Pradesh',
        'Others'
    ]
    return(
        <div className='state-modal'>
            <ul>
                {states.map((state, index) => (
                    <li onClick={()=>{
                        setStateValue(state);
                        setAddress(prev=>{
                            return {...prev, state: state}
                        })
                    }} 
                        key={index}
                        className = {stateValue == state ? 'state-modal-active-state' : ''}
                    >{state}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default FlightBookingPage