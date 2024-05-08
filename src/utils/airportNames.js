// const airportAndCity = [
//     {airport:'IXJ',city:'jammu'},
//     {airport:'CCU',city:'kolkata'},
//     {airport:'MAA',city:'chennai'},
//     {airport:'ATQ',city:'punjab'},
//     {airport:'BLR',city:'bengaluru'},
//     {airport:'BBI',city:'bhubaneswar'},
//     {airport:'PAT',city:'patna'},
//     {airport:'DEL',city:'new delhi'},
//     {airport:'BOM',city:'mumbai'},
//     {airport:'NAG',city:'nagpur'},
//     {airport:'PNQ',city:'pune'},
//     {airport:'DED',city:'dehradun'},
//     {airport:'GOI',city:'goa'},
//     {airport:'GAU',city:'guwahati'},
//     {airport:'RPR',city:'chhattisgarh'},
//     {airport:'IXM',city:'madurai'},
//     {airport:'GAY',city:'gaya'},
//     {airport:'AMD',city:'ahmedabad'},
//     {airport:'BDQ',city:'vadodara'},
//     {airport:'STV',city:'surat'},
//     {airport:'IXE',city:'mangaluru'},
//     {airport:'JAI',city:'jaipur'},
//     {airport:'LKO',city:'lucknow'},
//     {airport:'COK',city:'cochin'},
// ]
export const airportAndCity = {
    'IXJ':{city:'jammu'},
    'CCU':{city:'kolkata'},
    'MAA':{city:'chennai'},
    'ATQ':{city:'punjab'},
    'BLR':{city:'bengaluru'},
    'BBI':{city:'bhubaneswar'},
    'PAT':{city:'patna'},
    'DEL':{city:'new delhi'},
    'BOM':{city:'mumbai'},
    'NAG':{city:'nagpur'},
    'PNQ':{city:'pune'},
    'DED':{city:'dehradun'},
    'GOI':{city:'goa'},
    'GAU':{city:'guwahati'},
    'RPR':{city:'chhattisgarh'},
    'IXM':{city:'madurai'},
    'GAY':{city:'gaya'},
    'AMD':{city:'ahmedabad'},
    'BDQ':{city:'vadodara'},
    'STV':{city:'surat'},
    'IXE':{city:'mangaluru'},
    'JAI':{city:'jaipur'},
    'LKO':{city:'lucknow'},
    'COK':{city:'cochin'},
}

export const fromStations = [
    'Secunderabad', 
    'Katpadi',
    'Howrah',
    'Nagpur',
    'Ahmedabad',
    'Delhi',
    'Surat',
    'Chandigarh',
    'Dhanbad',
    'Moradabad',
    'Pune',
    'Kanpur',
    'Kollam',
    'Agra Cantonment',
    'Ludhiana',
    'Guwahati',
    'Manmad',
    
    // 'Lucknow',
    // 'Mughal Sarai',
    // 'Thiruvananthapuram',
]
export const toStations = [
    'Varanasi',
    'Vadodara',
    'Chandigarh',
    'Barddhaman',
    'Udaipur',
    'Salem',
    'Howrah',
    'Coimbatore',
    'Hubli',
    'Pune',
    'Thrissur',
    'Dhanbad',
    'Vijayawada',
    'Anand',
    'Kharagpur',
    'Ahmedabad',
    'Gorakhpur',
]

export const cities = [
    'Mumbai',
    'Kolkata',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Patna',
    'Agra',
    'Nagpur',
    'Jodhpur',
    'Amritsar',
    'Bhopal',
    'Kalyan-Dombivali',
    'Pimpri-Chinchwad',
    'Kanpur',
    'Visakhapatnam',
    'Nasik',
    'Srinagar',
    'Meerut',
    'Coimbatore',
    'Vijayawada',
]
export default function getAirportShortName(city){
    const cityInLowerCase = city.toLowerCase()
    switch(cityInLowerCase){

        case 'jammu' : return 'IXJ'
        case 'kolkata' : return 'CCU'
        case 'chennai' : return 'MAA'
        case 'punjab' : return 'ATQ'
        case 'bengaluru' : return 'BLR'
        case 'bhubaneswar' : return 'BBI'
        case 'patna' : return 'PAT'
        case 'new delhi' : return 'DEL'
        case 'mumbai' : return 'BOM'
        case 'nagpur' : return 'NAG'
        case 'pune' : return 'PNQ'
        case 'dehradun' : return 'DED'
        case 'goa' : return 'GOI'
        case 'guwahati' : return 'GAU'
        case 'chhattisgarh' : return 'RPR'
        case 'madurai' : return 'IXM'
        case 'gaya' : return 'GAY'
        case 'ahmedabad' : return 'AMD'
        case 'surat' : return 'STV'
        case 'mangaluru' : return 'IXE'
        case 'jaipur': return 'JAI'
        case 'lucknow': return 'LKO'
        case 'cochin': return 'COK'
        case 'vadodara': return 'BDQ'
    }
}

export function getCityNameByAirportName(airport){
    

}
