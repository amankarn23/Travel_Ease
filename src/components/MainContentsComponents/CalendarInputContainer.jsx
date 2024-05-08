import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";
import { DemoContainer} from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function CalendarInputContainer({labelFor, spanHeading, value, dispatch, type}) {

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
    <div>
      <label
        onClick={(e)=>{
          e.stopPropagation()
          setShowCalendar(n=>!n)
        }}
        htmlFor={labelFor} className='booking-inputBox'>
        <span className='dropdown'>{spanHeading}</span>
        <div className='font20 lineHeight-36'>
          
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
          <span className='p-r-6 lineHeight-36 font30 strongBold-text'>{value.date}</span>
          <span>{value.month}</span>
          <span className='shortYear'>{value.year%100}</span>
        </div>
        <span>{value.day}</span>
      </label>
    </div>
  )
}

export default CalendarInputContainer
