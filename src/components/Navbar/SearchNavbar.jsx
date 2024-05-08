import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import LoginModalProvider from '../../provider/LoginModalProvider'
import Profile from '../Profile'

const navbarElements = [
    { name: "Flights", cssClassForHeaderIcons: "chFlights", path: "/flight", },
    { name: "Hotels", cssClassForHeaderIcons: "chHotels", path: "/hotel" },
    { name: "Homestays & Villas", cssClassForHeaderIcons: "chHomeStays", path: "/homestays" },
    { name: "Holidays Packages",  cssClassForHeaderIcons: "chHolidays",path: "/holidays-india" },
    { name: "Trains", cssClassForHeaderIcons: "chTrains", path: "/railway" },
    { name: "Buses", cssClassForHeaderIcons: "chBuses", path: "/bus-tickets" },
    { name: "Cabs", cssClassForHeaderIcons: "chCabs", path: "/cabs" },
    
]

function SearchNavbar() {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <div className='searchPage-navbar'>
      <section className='makeFlex'>
            <div className='mainLogo-container' onClick={()=>navigate('/')}>
                <img className='mainLogo' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcd9GmClIj5fqJumiQxvxXczDQvqwYihJ-qg&s'} />
            </div>
            <nav className='makeFlex make-align-center'>
                <ul className='responsive-search-navbar makeFlex font12 headerIconsGap'>
                    {navbarElements.map((item, index)=>(
                        <li className='makeRelative' key={index}>
                            <Link 
                                to={`${(index == 0 || index == 1 || index == 4) ? item.path+"s" : "/"}`} 
                                className={`${location.pathname.includes(item.path) ? "active":""} makeFlex column make-align-center headerIcons ${index != 0 && index != 1 && index !=4 && 'not-allowed'}`}
                            >
                                <span className='headerIconWrapper'>
                                    <span className={`chSprite ${item.cssClassForHeaderIcons}`}></span>
                                </span>
                                <span className='headerIconTextAlignment chNavText darkGreyText'>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
      </section>
      <section>
        <Profile/>
      </section>
      <section className='searchPage-bg'></section>
    </div>
  )
}

export default SearchNavbar
