export default async function getTrain(id, setTrain, setLoading, coachId, setCoach){

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    
    try{
      let response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/train/${id}`,
        config
      )
      let result = await response.json();
      
      setTrain(result.data)
      setCoach((prev)=>{
        const coach = result.data.coaches.find((element)=>{
            return coachId.current == element._id
        })
        return coach;
      })
    }
    catch(error){
      
    }
    setLoading(false)
  }