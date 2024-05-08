import axios from "axios";

export default async function getFlightList(source, destination, day, setFlightList, setLoading){

    const config = {
        headers : {
            "Content-Type": "application/json",
            projectID: "f104bi07c490"
        }
    }
    const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&source=${source}&destination=${destination}`,
        config
    )
    setFlightList(result.data.data.flights);
    setTimeout(()=>{
        setLoading(false)
    },1000)
}