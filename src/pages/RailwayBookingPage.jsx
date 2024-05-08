import React, { useEffect, useRef, useState } from 'react'
import SearchNavbar from '../components/Navbar/SearchNavbar'
import { useParams, useSearchParams } from 'react-router-dom';
import getTrain from '../utils/getTrain';
import { useTrainBookingDetailsContext } from '../provider/TrainBookingDetailsProvider';
import { createPortal } from 'react-dom';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../provider/AuthProvider';
import { useLoginModalContext } from '../provider/LoginModalProvider';
import {  bookTrainTicket } from '../utils/bookTrain';
import SuccessFullBookingModal from '../Modals/SuccessFullBookingModal';
import { getMonth } from '../utils/dateFunctions';

function RailwayBookingPage() {
    const {isLoggedIn} = useAuth()
    const {setIsLoginModalVisible} = useLoginModalContext()
    const[loading, setLoading] = useState(true);
    const[train, setTrain] = useState()
    const {trainId} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const{trainBookingState} = useTrainBookingDetailsContext()
    const [coach, setCoach] = useState(null)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [showModal, setShowModal] = useState(false);
    const [showSuccessFullModal, setShowSuccessFullModal] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        email: '',
        phoneNumber: '',
        checked: false
    })
    const [travellers, setTravellers] = useState([])
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [travellerWarning, setTravellerWarning] = useState('')
    const [contactWarning, setContactWarning] = useState('')
    const coachId = useRef(searchParams.get('coachId'));
    useEffect(()=>{
        getTrain(trainId, setTrain, setLoading, coachId, setCoach)
    },[])
    
    function resetWarning(callback){
        setTimeout(()=>{
            callback('')
        },5000)
    }

    function handleBookNow(e){

        if(!travellers.length > 0){
            setTravellerWarning('Please add a traveller.')
            resetWarning(setTravellerWarning)
            return;
        }
        for(const property in contactInfo){
            if(!contactInfo[property]){
                setContactWarning('Please fill all contact information.')
                resetWarning(setContactWarning)
               return; 
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
        bookTrainTicket(trainId, trainBookingState, {date:searchParams.get('nextdate'), month: searchParams.get('nextmonth'), year: searchParams.get('nextyear')} ,setShowSuccessFullModal, setShowPaymentModal, setContactInfo, setTravellers)
    }
  return (
    <div>
      <SearchNavbar/>
      <div className='searchPage-header-container'>
        <h2 className='flightBookingPage-heading' style={{color:'#fff'}}>Select Travellers</h2>
      </div>
        {loading ? 
            <div>Loading...</div>
            :
            <div className='trainBookingPage-bookingDetails-container'>
                <div>
                    <div className='trainBookingPage-train-details-container'>
                        <div className='train-details'>
                            <div>
                            <div>
                                <h2>{train.trainName}</h2>
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
                                <h4>{train.departureTime}, <span style={{fontWeight:'400', color:'grey'}}>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}</span></h4>
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
                                <h4>{train.arrivalTime}, <span style={{fontWeight:'400', color:'grey'}}>{searchParams.get('nextdate')} {getMonth(searchParams.get('nextmonth'))}</span></h4>
                            </div>
                            <div className='source-station'>
                                <span>{train.destination}</span>
                            </div>
                            </div>
                        </div>
                        <div className='trainBookingpage-seat-details'>
                            <div>
                                <div>
                                    <span>Availability Status</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{coach.coachType}</span>
                                        <span>AVAILABLE-{coach.numberOfSeats}</span>
                                    </div>
                                    <div>
                                        <span>
                                            Updated few minutes ago
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span>Your Boarding Station</span>
                                </div>
                                <div>
                                    <span className='boarding-station-details' title={`${train.source} - ${train.departureTime} (${trainBookingState.travelDate.date} ${trainBookingState.travelDate.month})`}>{train.source} - {train.departureTime} ({trainBookingState.travelDate.date} {trainBookingState.travelDate.month})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Add Travellers </h2>
                        <span style={{fontSize:'10px', color:"red", fontWeight:"600"}}>{travellerWarning}</span>
                        <div className='trainBookingPage-traveller'>
                            {travellers.map((traveller, index)=>(
                                
                                <div key={index}>
                                    <span style={{textTransform:'capitalize'}}>{traveller.name} ({traveller.gender}), {traveller.age}</span>
                                    <button onClick={(e)=>{
                                        setTravellers(prev=>{
                                            prev.splice(index,1)
                                            const newArr = [...prev]
                                            return newArr
                                        })
                                    }}>
                                        DELETE
                                    </button>

                                </div>
                            ))}
                            <div>
                                <span className='trainBookingPage-addTraveler' onClick={()=>{
                                setShowModal(true)
                            }}>
                                + ADD TRAVELLER
                                </span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div>
                        <h3>Contact Information</h3>
                        <span style={{fontSize:'10px', color:"red", fontWeight:"600"}}>{contactWarning}</span>
                        <div className='trainBookingPage-contact-info'>
                            <div>
                                <span>Email Id</span>
                                <input type="email" onChange={(e)=>{
                                    setContactInfo(prev=>{
                                        return {...prev, email: e.target.value}
                                    })
                                }} value={contactInfo.email} placeholder='Enter Email Id'/>
                            </div>
                            <div>
                                <span>Mobile Number</span>
                                <input step="0.01" type="number" onChange={(e)=>{
                                    setContactInfo(prev=>{
                                        return {...prev, phoneNumber: e.target.value}
                                    })
                                }} value={contactInfo.phoneNumber} placeholder='Enter Mobile Number'/>
                            </div>
                        </div>
                        <div className='contact-info-checkbox'>
                            <input type="checkbox" checked={contactInfo.checked} onChange={(e)=>{
                            setContactInfo(prev=>{
                                return {...prev, checked: e.target.checked}
                            })
                        }} id='confirm' />
                            <label style={{paddingLeft:"4px", fontSize:"14px", cursor:"pointer"}} htmlFor="confirm">Confirm</label>
                        </div>
                    </div>
                    <div className='trainBookingPage-fare-details-container responsive-trainBookingPage-fare-details-container'>
                        <div onClick={handleBookNow}>
                            <button>PAY & BOOK NOW</button>
                        </div>
                        <div>
                            <div>
                                <span>Base fare per adult</span>
                                <span>₹{train.fare}</span>
                            </div>
                            <div>
                                <span>Reservation charge</span>
                                <span>₹20</span>
                            </div>
                        </div>
                        <div>
                            <span>Total Price per adult</span>
                            <span>₹{train.fare+20}</span>
                        </div>
                    </div>
                    {/* <div>
                        <h3>Yout State</h3>
                    </div> */}
                    {showPaymentModal && <PaymentModal totalPrice={travellers.length*(train.fare+20)} callback={bookTicket}/>}
                </div>
                <div>
                    <div style={{top:'100px'}} className='non-scrollable'>
                        <div className='trainBookingPage-fare-details-container'>
                            <div onClick={handleBookNow}>
                                <button>PAY & BOOK NOW</button>
                            </div>
                            <div>
                                <div>
                                    <span>Base fare per adult</span>
                                    <span>₹{train.fare}</span>
                                </div>
                                <div>
                                    <span>Reservation charge</span>
                                    <span>₹20</span>
                                </div>
                            </div>
                            <div>
                                <span>Total Price per adult</span>
                                <span>₹{train.fare+20}</span>
                            </div>
                        </div>
                        {/* <div>
                            <span style={{fontSize:'10px', color:"red", fontWeight:"600"}}>{warning}</span>
                        </div> */}
                    </div>
                </div>
            </div>  
        }
        {showModal && <UserDetailModalForTrain setTravellers={setTravellers} setShowModal={setShowModal}/>}
        {showSuccessFullModal && <SuccessFullBookingModal setShowSuccessFullModal={setShowSuccessFullModal}/>}
    </div>
  )
}

export default RailwayBookingPage

function UserDetailModalForTrain({setTravellers, setShowModal}){
    const [gender, setGender] = useState('Select')
    const [showGenderModal, setShowGenderModal] = useState(false)
    const [passenger, setPassenger] = useState({
        name:'',
        age:'',
        gender: 'Select'
    })
    const [warning, setWarning] = useState('')
    return(
        <>
        {createPortal(
            <div onClick={()=>{
                setShowModal(false)
            }} className='user-detail-modal'>
                <div onClick={(e)=>{
                    e.stopPropagation()
                    setShowGenderModal(false)
                }}>
                    <div>
                        <h3>Add Traveller Information</h3>
                        <div>
                            <div>
                                <span>Name</span>
                                <input type="text" onChange={(e)=>{
                                    setPassenger(prev=>{
                                        return{...prev,name:e.target.value}
                                    })
                                }} value={passenger.name} placeholder='Enter Traveller Name' name="" id=""/>
                            </div>
                            <div>
                                <span>Age (in years)</span>
                                <input type="number" onChange={(e)=>{
                                    setPassenger(prev=>{
                                        return{...prev,age:e.target.value}
                                    })
                                }} value={passenger.age} placeholder='Enter Age' name="" id=""/>
                            </div>
                            <div onClick={(e)=>{
                                e.stopPropagation()
                                setShowGenderModal(!showGenderModal);
                            }}>
                                <span>Gender</span>
                                <input readOnly type="text" value={passenger.gender} name="" id=""/>
                                <span className='train-modal-dropdown'></span>
                                {showGenderModal && <GenderModal setPassenger={setPassenger} />}
                            </div>
                            <div>
                                <span>Nationality</span>
                                <input type="text" readOnly value={'India'} disabled name="" id=""/>
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <span style={{fontSize:'10px', color:"red", fontWeight:"600"}}>{warning}</span>
                        <div>
                            <button onClick={()=>{
                                setShowModal(false)
                            }}>Cancel</button>
                            <button onClick={()=>{
                                if(passenger.name && passenger.age && passenger.gender != 'Select'){
                                    setShowModal(false)
                                    setTravellers(prev=>{
                                        return [...prev, passenger]
                                    })
                                }
                                else{
                                    setWarning('Please fill all field.')
                                    setTimeout(()=>{
                                        setWarning('')
                                    },5000)
                                }
                            }}>Add</button>
                        </div>
                    </div>
                </div>
            </div>,
        document.body)
        }
        </>
    )
}
function GenderModal({setPassenger}){
    return(
        <div className='gender-modal'>
            <div onClick={()=>{
                setPassenger(prev=>{
                    return {...prev, gender:'Male'}
                })
            }}>Male</div>
            <div onClick={()=>{
                setPassenger(prev=>{
                    return {...prev, gender:'Female'}
                })
            }}>Female</div>
        </div>
    )
}