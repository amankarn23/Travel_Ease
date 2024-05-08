import React, { useEffect, useRef, useState } from 'react'
import SearchPageLocationInputContainer from '../SearchContentComponent/SearchPageLocationInputContainer';
import { useTrainBookingDetailsContext } from '../../provider/TrainBookingDetailsProvider';
import SearchPageCalendarInputContainer from '../SearchContentComponent/SearchPageCalendarInputContainer';
import { useTrainListContext } from '../../provider/TrainListProvider';
import getTrainList from '../../utils/getTrainList';
import TrainClassModal from '../../Modals/TrainClassModal';
import { createPortal } from 'react-dom';

function SearchPageHeaderForTrain({setLoading, setSuggestedTrainList}) {
  const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
  const {setTrainList} = useTrainListContext()

  const [portal, setPortal] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const portalRef = useRef()

  function handlePortalOnResize(){

    if(window.innerWidth <= 1025){
    setPortal(true)
    }
    else{
        setPortal(false)
        setShowPortal(false)
    }
  }
    useEffect(()=>{
        getTrainList(trainBookingState.fromCity, trainBookingState.toCity, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading, setSuggestedTrainList)
        window.addEventListener('resize', handlePortalOnResize)
        if(window.innerWidth <= 1025){
            setPortal(true)
            }
        return ()=>{
            window.removeEventListener('resize', handlePortalOnResize)
            }
    },[])
    useEffect(()=>{
        
    },[])
  return (
    <div className='searchPage-header-container'>
        {!portal ? 
            <div className='makeFlex'>
                <section className='searchPage-booking-details-container'>
                    <SearchPageLocationInputContainer
                        key={0}
                        inputId={'fromCity'}
                        spanHeading={'From'}
                        value={trainBookingState.fromCity}
                        dispatch={dispatchTrainBookingState}
                        type={'trainFromCity'}
                        modal={'train'}
                        >
                        
                    </SearchPageLocationInputContainer>
                    <div onClick={()=>{
                            dispatchTrainBookingState({type:'swap'})
                        }}>
                            <div className='swap-icon'></div>
                        </div>
                    <SearchPageLocationInputContainer
                        key={1}
                        inputId={'toCity'}
                        spanHeading={'To'}
                        value={trainBookingState.toCity}
                        dispatch={dispatchTrainBookingState}
                        type={'trainToCity'}
                        modal={'train'}
                    />
                    <SearchPageCalendarInputContainer
                        labelFor={'travelDate'}
                        spanHeading={'Depart'}
                        value={trainBookingState.travelDate}
                        dispatch={dispatchTrainBookingState}
                        type={'trainTravelDate'}
                    />
                    <SearchPageTrainClassInput
                        value={trainBookingState}
                        dispatch={dispatchTrainBookingState}
                    />
                </section>
                <section>
                    <p className='makeFlex make-justify-center'>
                        <button onClick={()=>{
                            const source = trainBookingState.fromCity
                            const destination = trainBookingState.toCity;
                            setLoading(true)
                            getTrainList(source, destination, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading, setSuggestedTrainList)
                            // flightSourceRef.current = flightBookingState.fromCity
                            // flightDestinationRef.current = flightBookingState.toCity

                        }} className='primaryBtn widgetSearchBtn bold-text'>SEARCH</button>
                    </p>
                </section>
            </div>
            :
            <div ref={portalRef} className='responsive-search-bar'>
                <div>
                    <p>{trainBookingState.fromCity} - {trainBookingState.toCity}</p>
                    <p>{trainBookingState.travelDate.date} {trainBookingState.travelDate.month}, {trainBookingState.travelDate.day} </p>
                </div>
                <div onClick={()=>{
                    setShowPortal(true)
                }}>
                    <img src="https://imgak.mmtcdn.com/flights/assets/media/mobile/common/xhdpi/edit_icon.png" alt="" />
                    <span>Edit</span>
                </div>
                
            </div>
        }
        {showPortal && 
            <SearchPortal portalRef={portalRef} setShowPortal={setShowPortal} setLoading={setLoading} setSuggestedTrainList={setSuggestedTrainList}/>
        }
        </div>
  )
}

export default SearchPageHeaderForTrain

function SearchPageTrainClassInput({value, dispatch}){
    
    const [showModal, setShowModal] = useState(false)
    const myElementRef = useRef(null)
    return(
        <div ref={myElementRef} onClick={(e)=>{
            setShowModal(n=>!n)
          }} className='searchPage-booking-input'>
            <label htmlFor='class' className='searchPage-booking-inputBox'>
                <span className='dropdown'>PASSENGERS & CLASS</span>
                <div>
                    <span >{value.ticketClass.text}, </span>
                    <span>{value.ticketClass.head}</span>
                </div>
            </label>
            {showModal && <TrainClassModal myElementRef={myElementRef} setShowModal={setShowModal} value={value} dispatch={dispatch} search={true}/>}
        </div>
    )
}

function SearchPortal({portalRef, setShowPortal, setLoading, setSuggestedTrainList}){
    const {trainBookingState, dispatchTrainBookingState} = useTrainBookingDetailsContext()
    const {setTrainList} = useTrainListContext()

    const myElementRef = useRef()

    function handlePortal(e){
        
        if(!portalRef.current?.contains(e.target) && !myElementRef.current?.contains(e.target) && !(e.target.classList.contains("stations") ) ){
        setShowPortal(false);
        }
    }
    useEffect(()=>{
        document.body.addEventListener('click', handlePortal)
        return ()=>{
        document.body.removeEventListener('click', handlePortal)
        }
    },[])

    return(
        <>
            {
                createPortal(
                    <div style={{position: "fixed", zIndex: '1000', width: '100vw', height: '100vh', backdropFilter: "blur(5px)", left: '0', top: '0'}}>
                    <div ref={myElementRef} className='search-bar-portal-flight'>
                        <section className='searchPage-booking-details-container'>
                            <SearchPageLocationInputContainer
                                key={0}
                                inputId={'fromCity'}
                                spanHeading={'From'}
                                value={trainBookingState.fromCity}
                                dispatch={dispatchTrainBookingState}
                                type={'trainFromCity'}
                                modal={'train'}
                                >
                                
                            </SearchPageLocationInputContainer>
                            <div onClick={()=>{
                                    dispatchTrainBookingState({type:'swap'})
                                }}>
                                    <div className='swap-icon'></div>
                                </div>
                            <SearchPageLocationInputContainer
                                key={1}
                                inputId={'toCity'}
                                spanHeading={'To'}
                                value={trainBookingState.toCity}
                                dispatch={dispatchTrainBookingState}
                                type={'trainToCity'}
                                modal={'train'}
                            />
                            <SearchPageCalendarInputContainer
                                labelFor={'travelDate'}
                                spanHeading={'Depart'}
                                value={trainBookingState.travelDate}
                                dispatch={dispatchTrainBookingState}
                                type={'trainTravelDate'}
                            />
                            <SearchPageTrainClassInput
                                value={trainBookingState}
                                dispatch={dispatchTrainBookingState}
                            />
                        </section>
                        <section>
                            <p className='makeFlex make-justify-center'>
                                <button onClick={()=>{
                                    const source = trainBookingState.fromCity
                                    const destination = trainBookingState.toCity;
                                    setLoading(true)
                                    getTrainList(source, destination, trainBookingState.travelDate.day.substring(0,3), setTrainList, setLoading, setSuggestedTrainList)
                                    setShowPortal(false)
                                }} className='primaryBtn widgetSearchBtn bold-text'>SEARCH</button>
                            </p>
                        </section>
                    </div>
                    </div>,
                    document.body
                )
            }
        </>
    )
}