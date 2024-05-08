import "./styles/App.css";
import MainContent from "./MainContent";
import AuthProvider from "./provider/AuthProvider";
import { Route, Routes } from "react-router-dom";
import HotelBookingDetailsProvider from "./provider/HotelBookingDetailsProvider";
import TrainBookingDetailsProvider from "./provider/TrainBookingDetailsProvider";
import FlightBookingDetailsProvider from "./provider/FlightBookingDetailsProvider";
import SearchContent from "./SearchContent";
import HotelsListProvider from "./provider/HotelsListProvider";
import LoginModalProvider from "./provider/LoginModalProvider";
import SingleHotel from "./pages/SingleHotel";
import FlightListProvider from "./provider/FlightListProvider";
import FlightBookingPage from "./pages/FlightBookingPage";
import TrainListProvider from "./provider/TrainListProvider";
import RailwayBookingPage from "./pages/RailwayBookingPage";
import HotelBookingPage from "./pages/HotelBookingPage";
import MyTrips from "./pages/MyTrips";



function App() {


  return (
    
      <AuthProvider>
      <LoginModalProvider>
      <HotelBookingDetailsProvider>
      <TrainBookingDetailsProvider>
      <FlightBookingDetailsProvider>
        <HotelsListProvider>
          <FlightListProvider>
            <TrainListProvider>
          <Routes>
            <Route path="/*" element={<MainContent/>}/>
            <Route path="/mytrips" element={<MyTrips/>}/>
            <Route path="/:section/search" element={<SearchContent/>}/>
            <Route path="/hotel/:hotelId" element={<SingleHotel/>}/>
            <Route path="/flight/:flightId" element={<FlightBookingPage/>}/>
            <Route path="/railway/:trainId" element={<RailwayBookingPage/>}/>
            <Route path="hotel/booking/:hotelId" element={<HotelBookingPage/>}/>
          </Routes>
          </TrainListProvider>
          </FlightListProvider>
          </HotelsListProvider>
      </FlightBookingDetailsProvider>
      </TrainBookingDetailsProvider>
      </HotelBookingDetailsProvider>
      </LoginModalProvider>
      </AuthProvider>
      
    
      );
    }

export default App;

