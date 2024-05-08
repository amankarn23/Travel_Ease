import React from 'react'
import './FlightPageAds.css'
function FligthPageAds1() {
  return (
    <div className='flight-ads-container'>
      <div className='flight--exploreMore-container'>
        <div className='flight--exploreMore'>
            <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_downArrow.png" alt="" />
            <span>Explore More</span>
            <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_downArrow.png" alt="" />
        </div>
        <div className='flight--exploreMore-ad'>
            <div>
                <img src="https://promos.makemytrip.com/appfest/2x/icon-wheretogo-23062022.png" alt="" />
                <div><span>Where2Go</span></div>
            </div>
            <div>
                <img src="https://promos.makemytrip.com/appfest/2x/trip-money-1.png" alt="" />
                <div>
                    <span>Insurance</span>
                    <span>For International Trips</span>
                </div>
            </div>
            <div>
                <img src="https://promos.makemytrip.com/Growth/Images/B2C/2x/dt_tert_flights.png" alt="" />
                <div>
                    <span>Explore International Flights</span>
                    <span>Cheapest Flights to Paris, Bali, Tokyo & more</span>
                </div>            
            </div>
            <div>
                <img src="https://promos.makemytrip.com/images/myBiz/MICE/mice%20icon%20-%20square.png" alt="" />
                <div>
                    <span>MICE</span>
                    <span>Offsites, Events & Meetings</span>
                </div>  
            </div>
        </div>
      </div>
    </div>
  )
}

export default FligthPageAds1
const propertyDetailsArray = [
    {img: 'http://promos.makemytrip.com/images/50x50-Other-23052019.png', heading: 'Chennai Flights', description: 'Via - Delhi, Mumbai, Coimbatore, Madurai'},
    {img: 'https://promos.makemytrip.com/store/GoaDT.JPG', heading: 'Goa Flights', description: 'Via - Delhi , Mumbai, Bangalore, Ahmedabad'},
    {img: 'https://promos.makemytrip.com/store/MumbaiDT.JPG', heading: 'Mumbai Flights', description: 'Via - Delhi, Bangalore, Chennai, Ahmedabad'},
    {img: 'http://promos.makemytrip.com/images/50x50-Ooty-23052019.png', heading: 'Hyderabad Flights', description: 'Via - Chennai, Mumbai, Bangalore, Delhi'},
    {img: 'https://promos.makemytrip.com/store/DelhiDT.JPG', heading: 'Delhi Flights', description: 'Via - Mumbai, Pune, Bangalore, Chennai'},
    {img: 'https://promos.makemytrip.com/store/PuneDT.JPG', heading: 'Pune Flights', description: 'Via - Delhi, Bangalore, Chennai, Ahmedabad'},
    {img: 'https://promos.makemytrip.com/store/SingaporeDT.JPG', heading: 'Kolkata Flights', description: 'Via - Delhi, Mumbai, Bangalore, Pune'},
    {img: 'https://promos.makemytrip.com/store/BangaloreDT.JPG', heading: 'Bangalore Flights', description: 'Via - Delhi, Pune, Mumbai, Kolkata'},
    {img: 'https://promos.makemytrip.com/store/JaipurDT.JPG', heading: 'Jaipur Flights', description: 'Via - Mumbai, Delhi, Pune, Bangalore'},
]
export function FligthPageAds2(){

    return(
        <div className='flight-add-container2'>

            <div className='downloadApp-ad'>
                <div className='downloadIcon-and-text-container'>
                    <div>
                        <span className='downloadIcon download--icons'></span>
                    </div>
                    <div className='downloadText-container'>
                        <h1>Download App Now !</h1>
                        <p>Use code <strong>WELCOMEUSER</strong> and get <strong>FLAT</strong> 12% OFF* on your first domestic flight booking</p>
                    </div>
                </div>
                <div className='downloadApp-resource'>
                    <div>
                        <div><span className='downloadFrom-android download--icons'></span></div>
                        <div><span className='downloadFrom-ios download--icons'></span></div>
                    </div>
                    <div>
                        <img className='downloadScanner' src="https://lh3.googleusercontent.com/drive-viewer/AKGpihZeIXE-ucWvv6Kmb6A-CCTFUhaRPia6dc81SbShNnJSOWGLt9ocavMqyDdj9dCafrtUFndzQBVJfEb1xbPLcyuzuU3IuQ=s1600-v0" alt="" />
                    </div>
                </div>
            </div>
            <div className='property-ads'>
                {propertyDetailsArray.map((item, index)=>(
                    <div key={index} className='property-ads-card'>
                        <img src={item.img} alt="" />
                        <div>
                            <p>{item.heading}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
