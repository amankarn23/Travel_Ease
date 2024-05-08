import React from 'react'
import SearchNavbar from './components/Navbar/SearchNavbar'
import { Route, Routes, useParams } from 'react-router-dom'
import FlightSearch from './pages/FlightSearch'
import HotelSearch from './pages/HotelSearch'
import { useLoginModalContext } from './provider/LoginModalProvider'
import RailwaySearch from './pages/RailwaySearch'

const sections = {
    flight: <FlightSearch />,
    hotel: <HotelSearch />,
    railway: <RailwaySearch />
  }
function SearchContent() {
    const {section} = useParams()
    const {isLoginModalVisible, setIsLoginModalVisible} = useLoginModalContext()

  return (
    <div>
        <SearchNavbar/>
        {/* <Routes>
          <Route path="/flight/search" element={<FlightSearch/>}/>
          <Route path="/hotel/search" element={<HotelSearch/>}/>
        </Routes> */}
        {sections[section] && sections[section]}
    </div>
  )
}

export default SearchContent
