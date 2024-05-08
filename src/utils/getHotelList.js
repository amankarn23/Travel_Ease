export default async function getHotelList(setHotelList, city){

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    
    try{
      let response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
        config
      )
      let result = await response.json();
      
      setHotelList(result.data.hotels)
    }
    catch(error){
      
    }
  }