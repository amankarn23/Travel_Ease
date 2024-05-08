export function bookFlightTicket(flightId, flightBookingState, nextDate, setSuccessModal, setShowPaymentModal, setAddedTravellers, setBookingDetailsSentTo, setAddress){
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const userId = user.id;
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date = flightBookingState.travelDate.date;
    const month = monthNames.indexOf(flightBookingState.travelDate.month);
    const year = flightBookingState.travelDate.year;
    const startDate = new Date(year, month, date)
    const endDate = new Date(nextDate.year, nextDate.month, nextDate.date)
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString()
    const config = {
      method: "POST",
      body : JSON.stringify({
        "bookingType" : "flight",
        "userId" : userId,
        "bookingDetails" : {
          "flightId":flightId,
          "startDate": formattedStartDate,
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
        setAddedTravellers([])
        setBookingDetailsSentTo({
          number:"",
          email:""
        })
        setAddress({
          pincode:"",
          state:"",
          address:"",
          checked: false
        })
      }
    }).catch((e)=>{
      
    })
  }