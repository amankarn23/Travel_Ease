import React, { useEffect, useRef, useState } from 'react'
import dayjs from "dayjs";
import { DemoContainer} from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function SearchPageCalendarInputContainer({labelFor, spanHeading, value, dispatch, type}) {
    
    const [showCalendar, setShowCalendar] = useState(false)
    const [value1, setValue1] = useState(dayjs());
    function closeModal(){
      setShowCalendar(false)
    }
    useEffect(()=>{
      document.addEventListener('click',closeModal)
      return ()=>{
        document.removeEventListener('click',closeModal)
      }
    },[])
    useEffect(()=>{
      closeModal()
    },[value.date])
    function handleDateChange(e){
      setValue1(e)
      dispatch(
        {
          type: type, 
          payload: {
            date: e.$d.getDate(),
            month: e.$d.getMonth(),
            year: e.$d.getFullYear(),
            day: new Date(e).getDay()
          }
        }
      )
    }

  return (
    <div className='searchPage-booking-input'>
      <label
        onClick={(e)=>{
          e.stopPropagation()
          setShowCalendar(n=>!n)
        }}
        htmlFor={labelFor} className='searchPage-booking-inputBox'>
        <span className='dropdown'>{spanHeading}</span>
        <div>

          {showCalendar &&
           <div onClick={(e)=>{e.stopPropagation()}} className='calendar'> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DateCalendar
                      value={value1}
                      minDate={dayjs()}
                      onChange={handleDateChange}
                    />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          }
        <span>{value.day.substring(0,3)+", "}</span>
          <span>{value.date}</span>{" "}
          <span>{value.month}</span>{', '}
          <span>{value.year}</span>
        </div>
      </label>
    </div>
  )
}

export default SearchPageCalendarInputContainer
