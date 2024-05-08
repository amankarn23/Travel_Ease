export default async function getHotel(id, setHotel, setName, setLoading, roomId, setRoom){

    const config = {
      Method : "GET",
      headers : {
        "Content-Type": "application/json",
        projectID: "f104bi07c490"
      }
    }
    
    try{
      let response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${id}`,
        config
      )
      let result = await response.json();
      
      setName(result.data.name)
      setHotel(result.data)
      if(roomId){
        setRoom((prev)=>{
          const room = result.data.rooms.find((element)=>{
              return roomId.current == element._id;
          })
          return room;
        })
      }
    }
    catch(error){
      
    }
    setLoading(false)
  }