export function bookHotelTicket(hotelId, hotelBookingState, setSuccessModal, setShowPaymentModal, setAddAdults, emailRef, phoneRef, confirmRef){
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const userId = user.id;
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const checkInDate = hotelBookingState.checkIn.date
    const checkInMonth = monthNames.indexOf(hotelBookingState.checkIn.month);
    const checkInYear = hotelBookingState.checkIn.year;
    const startDate = new Date(checkInYear, checkInMonth, checkInDate)

    const checkOutDate = hotelBookingState.checkOut.date;
    const checkOutMonth = monthNames.indexOf(hotelBookingState.checkOut.month);
    const checkOutYear = hotelBookingState.checkOut.year;
    const endDate = new Date(checkOutYear, checkOutMonth, checkOutDate)

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString()
    const config = {
      method: "POST",
      body : JSON.stringify({
        "bookingType" : "hotel",
        "userId" : userId,
        "bookingDetails" : {
          "hotelId":hotelId,
          "startDate":formattedStartDate,
          "endDate" : formattedEndDate
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "projectID": "f104bi07c490",
        "Authorization": `Bearer ${token}`
      }
    }
    fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking',config).then((res)=>{
      return res.json();
    }).then((result)=>{
      
      if(result.message == "Booking successful"){
        setSuccessModal(true)
        setShowPaymentModal(false)
        setAddAdults([])
        emailRef.current.value=''
        phoneRef.current.value=''
        confirmRef.current.checked = false
      }
    }).catch((e)=>{
      
    })
  }