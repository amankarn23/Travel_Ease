import React, { useEffect, useState } from 'react'
import './Modals.css'
import { airportAndCity, cities, fromStations, toStations } from '../../utils/airportNames';

function LocationInputContainer({children, inputId, spanHeading, value, dispatch, type, modal}) {
  const [showModal, setShowModal] = useState(false);
  function setModalFalse(e){
    setShowModal(false)
  }
  useEffect(()=>{
    document.body.addEventListener('click', setModalFalse)
    return ()=>{
      document.body.removeEventListener('click',setModalFalse);
    }
  },[])
  return (
    <div onClick={(e)=>{e.stopPropagation()}}>
        <label htmlFor={inputId} className='booking-inputBox'>
            <span>{spanHeading}</span>
            <input onClick={()=>{
              setShowModal(n=>!n)
            }} type="text" readOnly id={inputId} value={value} style={{caretColor:"transparent"}}/>
            <span>{'India'}</span>
        </label>
        {children}
        {modal == 'flight' && showModal && <FlightsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
        {modal == 'train' && showModal && <TrainsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
        {modal == 'hotel' && showModal && <HotelsLocationModal spanHeading={spanHeading} dispatch={dispatch} type={type} setShowModal={setShowModal}/>}
    </div>
  )
}

export default LocationInputContainer

export function FlightsLocationModal({dispatch, type, setShowModal, spanHeading}){
  const airport = []
  for(const element in airportAndCity){
    airport.push(element)
  }
  
  return(
    <div className='flight-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          airport.map((city, index)=>{
            return(
              <li key={index} onClick={()=>{
                dispatch({type:type, payload: airportAndCity[city].city})
                setShowModal(false)
              }}>
                <div>
                <span>{city}</span>
                </div>
                <div>
                <span>{airportAndCity[city].city}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export function TrainsLocationModal({dispatch, type, setShowModal, spanHeading}){
  
  const stations = spanHeading == 'From' ? fromStations : toStations;
  return(
    <div className='flight-location-modal'>
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
                <div>
                {/* <span>{city}</span> */}
                </div>
                <div style={{marginLeft:'0rem'}}>
                <span>{station}</span>
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
    <div className='flight-location-modal'>
      <div>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
        <input placeholder={spanHeading} type="text" />
      </div>
      <ul>
        {
          citiesArr.map((city, index)=>{
            return(
              <li key={index} onClick={()=>{
                dispatch({type:type, payload: city})
                setShowModal(false)
              }}>
                <div>
                {/* <span>{city}</span> */}
                </div>
                <div style={{marginLeft:'0rem'}}>
                <span>{city}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
