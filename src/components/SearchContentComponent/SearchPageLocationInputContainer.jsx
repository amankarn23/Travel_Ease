import React, { useEffect, useState } from 'react'
import { airportAndCity, cities, fromStations, toStations } from '../../utils/airportNames';


function SearchPageLocationInputContainer({children, inputId, spanHeading, value, dispatch, type, modal}) {
  const [showModal, setShowModal] = useState(false);
  function closeModal(){
    setShowModal(false)
  }
  useEffect(()=>{
    document.addEventListener('click', closeModal)
    return ()=>{
      document.removeEventListener('click', closeModal)
    }
  },[])
  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='searchPage-booking-input'>
        <label htmlFor={inputId} className='searchPage-booking-inputBox'>
            <span>{spanHeading}</span>
            <input onClick={()=>{
              setShowModal(n=>!n)
            }} type="text" id={inputId} readOnly style={{caretColor:"transparent"}} value={value}/> 
        </label>
        {children}
        {modal == 'flight' && showModal && <FlightsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
        {modal == 'train' && showModal && <TrainsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
        {modal == 'hotel' && showModal && <HotelsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
    </div>
  )
}

export default SearchPageLocationInputContainer

function FlightsLocationModal({dispatch, type, setShowModal, spanHeading}){
  const airport = []
  for(const element in airportAndCity){
    airport.push(element)
  }
  
  return(
    <div className='flight-location-modal flight-search-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          airport.map((city, index)=>{
            return(
              <li className='airports' key={index} onClick={()=>{
                dispatch({type:type, payload: airportAndCity[city].city})
                setShowModal(false)
              }}>
                <div className='airports'>
                <span className='airports'>{city}</span>
                </div>
                <div className='airports'>
                <span className='airports'>{airportAndCity[city].city}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
function TrainsLocationModal({dispatch, type, setShowModal, spanHeading}){
  
  const stations = spanHeading == 'From' ? fromStations : toStations;
  return(
    <div className='flight-location-modal flight-search-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          stations.map((station, index)=>{
            return(
              <li key={index} onClick={()=>{
                dispatch({type:type, payload: station})
                setShowModal(false)
              }}>
                <div className='stations'>
                {/* <span>{city}</span> */}
                </div>
                <div className='stations' style={{marginLeft:'0rem'}}>
                <span className='stations'>{station}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export function HotelsLocationModal({dispatch, type, setShowModal, spanHeading}){
  const citiesArr = [...cities];
  return(
    <div className='flight-location-modal flight-search-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          citiesArr.map((city, index)=>{
            return(
              <li className='cities' key={index} onClick={()=>{
                dispatch({type:type, payload: city})
                setShowModal(false)
              }}>
                <div className='cities'>
                {/* <span>{city}</span> */}
                </div>
                <div className='cities' style={{marginLeft:'0rem'}}>
                <span className='cities'>{city}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
