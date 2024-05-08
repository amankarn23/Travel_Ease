import axios from "axios";

export default async function getTrainList(source, destination, day, setTrainList, setLoading, setSuggestedTrainList){

    const config = {
        headers : {
            "Content-Type": "application/json",
            projectID: "f104bi07c490"
        }
    }
    
    try{
        const resultForSuggestion = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${""}","destination":"${""}"}&day=${day}`,
            config
        )
        setSuggestedTrainList(resultForSuggestion.data.data.trains);
        const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${source}","destination":"${destination}"}&day=${day}`,
            config
        )
        setTrainList(result.data.data.trains);
    } catch(e){
        
        setTrainList([])
    }
    setTimeout(()=>{
        setLoading(false)
    },1000)
}