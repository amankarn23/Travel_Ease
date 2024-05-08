export function bookTrainTicket(trainId, trainBookingState, nextDate, setSuccessModal, setShowPaymentModal, setContactInfo, setTravellers){
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const userId = user.id;
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const date = trainBookingState.travelDate.date
    const month = monthNames.indexOf(trainBookingState.travelDate.month)
    const year = trainBookingState.travelDate.year
    const startDate = new Date(year, month, date)
    const endDate = new Date(nextDate.year, nextDate.month, nextDate.date)
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString()
    
    const config = {
      method: "POST",
      body : JSON.stringify({
        "bookingType" : "train",
        "userId" : userId,
        "bookingDetails" : {
          "trainId":trainId,
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
        setContactInfo({
          email: '',
          phoneNumber: '',
          checked: false
        })
        setTravellers([])
      }
    }).catch((e)=>{
      
    })
  }