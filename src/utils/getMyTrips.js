export async function getMyTrips(setAllTrips){
    const token = localStorage.getItem("userToken");
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "projectID": "f104bi07c490",
          "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/booking/', config);
        const result = await response.json()
        
        setAllTrips(result.data)
    } catch (error) {
        
    }
    
}