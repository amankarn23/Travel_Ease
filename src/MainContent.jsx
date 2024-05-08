import React from 'react'
import "./styles/MainContent.css";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import FlightsContent from './pages/FlightsContent';
import HotelsContent from './pages/HotelsContent';
import RailwaysContent from './pages/RailwaysContent';
import Header from './components/Navbar/Header';
import Navbar from './components/Navbar/Navbar';
import FligthPageAds1, { FligthPageAds2 } from './components/FligthPageAds';
import Footer from './components/Footer';
import HotelPageAds1 from './components/HotelPageAds';
import PageNotFound from './pages/PageNotFound';

function MainContent() {

  const location = useLocation()

  return (
    <>
    <div className="container" >
      <Header/>
      <Navbar/>
    <div className='mainContent-container-wrapper makeFlex make-justify-center'>
      <div className='mainContent-container'>
        
        <Routes>
          <Route path='/' element={<FlightsContent/>}/>
          <Route path='flights' element={<FlightsContent/>}/>
          <Route path='hotels' element={<HotelsContent/>}/>
          <Route path='railways' element={<RailwaysContent/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>
    </div>
      <FligthPageAds1/>
      {/* {location.pathname == '/flights' && <FligthPageAds1/>} */}
      {/* {location.pathname == '/hotels' && <HotelPageAds1/>} */}
    </div>
      <div>
        <FligthPageAds2/>
      </div>
      <Footer/>
    </>
  )
}

export default MainContent


