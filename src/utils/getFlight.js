export default async function getFlight(id, setFlight, setLoading){

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    
    try{
      let response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${id}`,
        config
      )
      let result = await response.json();
      setFlight(result.data)
    }
    catch(error){
    }
    setLoading(false)
  }