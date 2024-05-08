import { getDay, getMonth } from "../utils/dateFunctions";

const day = new Date();
const nextDay = new Date(day)
nextDay.setDate(day.getDate()+1)
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const hotalBookingDetails={
    city: 'Mumbai',
    checkIn: {
        date: new Date().getDate(),
        month: getMonth(new Date().getMonth()),
        year: new Date().getFullYear(),
        day: getDay(new Date().getDay())
    },
    checkOut: {
        date: nextDay.getDate(),
        month: getMonth(nextDay.getMonth()),
        year: nextDay.getFullYear(),
        day: getDay(nextDay.getDay())
    },
    room : 1,
    adults: 2,
    childrens: null
}
export default function hotelReducer(state, action){
    let checkInDate;
    let checkOutDate;
    switch(action.type){

        case 'hotelLocation':
            return {
                ...state,
                city: action.payload
            }
        case 'hotleCheckIn' :
            checkOutDate = new Date(state.checkOut.year, monthNames.indexOf(state.checkOut.month), state.checkOut.date)
            checkInDate = new Date(action.payload.year, action.payload.month, action.payload.date)
            if(checkOutDate < checkInDate){
                const nextDate = new Date(checkInDate)
                nextDate.setDate(checkInDate.getDate()+1);
                return{
                    ...state,
                    checkIn:{
                        ...state.checkIn,
                        date: action.payload.date,
                        month: getMonth(action.payload.month),
                        year: action.payload.year,
                        day: getDay(action.payload.day)
                    },
                    checkOut:{
                        ...state.checkOut,
                        date: nextDate.getDate(),
                        month: getMonth(nextDate.getMonth()),
                        year: nextDate.getFullYear(),
                        day: getDay(nextDate.getDay())
                    }   
                }
            }
            return{
                ...state,
                checkIn:{
                    ...state.checkIn,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year,
                    day: getDay(action.payload.day)
                },    
            }
        case 'hotleCheckOut' :
            checkOutDate = new Date(action.payload.year, action.payload.month, action.payload.date)
            checkInDate = new Date(state.checkIn.year, monthNames.indexOf(state.checkIn.month), state.checkIn.date)
            if(checkOutDate < checkInDate){
                const prevDate = new Date(checkInDate)
                prevDate.setDate(checkOutDate.getDate()-1);
                return{
                    ...state,
                    checkIn:{
                        ...state.checkIn,
                        date: prevDate.getDate(),
                        month: getMonth(prevDate.getMonth()),
                        year: prevDate.getFullYear(),
                        day: getDay(prevDate.getDay())
                    },
                    checkOut:{
                        ...state.checkOut,
                        date: action.payload.date,
                        month: getMonth(action.payload.month),
                        year: action.payload.year,
                        day: getDay(action.payload.day)
                    }   
                }
            }
            return{
                ...state,
                checkOut:{
                    ...state.checkOut,
                    date: action.payload.date,
                    month: getMonth(action.payload.month),
                    year: action.payload.year,
                    day: getDay(action.payload.day)
                },    
            }
            case 'updateRoomAndTravellers':
                return{
                    ...state,
                    room: action.payload.room,
                    adults: action.payload.adults
                }
        default:
            return {...state};
    }
}