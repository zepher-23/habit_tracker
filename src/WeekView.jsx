import { useState, useEffect } from 'react'
import axios from 'axios';
import Habit from './component/Habit';
import { useNavigate } from 'react-router-dom';
import './App.css'
import Weekly from './component/Weekly';
import Store from './Store'
import Reducers from './Reducers'
function WeekView() {
    const navigate = useNavigate();
    const [list, setList] = useState(Store.getState());
    console.log(list)

  const [weather,setWeather] = useState({
    time:"",
    temperature:"",
    icon:"",
    type:"",
    location:""
  
  })
  const [temperature,setTemperature] = useState(null)
  const [time,setTime] = useState(null)
  const [data,setData] = useState({name:"",duration:''})
  const [message, setMessage] = useState(null)
  const [view,setView] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      try {
          // Make an API call using Axios to get weather
          const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=1e819169b394417985a124633231711&q=india&aqi=yes');
          let temp = (response.data.current.temp_c+ "°C")
          let weather_type = response.data.current.condition.text;
          let weather_icon = response.data.current.condition.icon;
          let location = response.data.location.country;
          let time = formatDateTime(response.data.location.localtime)
          setWeather({time:time,temperature:temp,icon:weather_icon,type:weather_type,location:location})
          setTime(time);
          setTemperature(temp+"°C")
      } catch (error) {
          console.log(error); 
  };
}

fetchData();
  }, []);



  


 

  //-------------time formatting function -----------------
  function formatDateTime(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return (day +" "+ month +" "+ year +", " + formattedTime );
}




const handleView=()=>{
    
  navigate("/")
   }
  return (
    <>
       <div className="main" style={{width:'100vw',overflow:'hidden'}} >

        {/* ______________application navbar______________ */}
        <div className="navbar" style ={{padding:'0',height:'100px',width:'100vw',display:'flex',flexDirection:'row',backgroundColor:'royalblue',justifyContent:'left',alignItems:'center'}}>
<h1 style={{flexGrow:'1',margin:'0',justifyContent:'left',display:'flex',padding:'30px',fontWeight:'400',fontFamily:'sans-serif'}}>Habit Tracker</h1>
<span></span> 
<button onClick={handleView}>Change View</button>
<h3 className="date" style={{padding:'30px'}}>{weather.time}</h3>
<img src={weather.icon} alt="weather icon"  style={{width:'40px'}}/>

<h3 className="temperature" style={{paddingRight:'30px'}}>{weather.temperature}</h3>
        </div>
        {/* _______________navbar ends_______________ */}

        <div className="container" style={{width:'100vw',display:'flex',flexDirection:'row',overflow:'hidden'}}>

        <div className="habitList" style={{height:'600px',width:'100vw',overflow:'scroll',paddingTop:'40px'}}>

       { list.map((item,index) => <Weekly key={index}  itemIndex={index} name={item.name} status={item.status} date={item.date} duration={item.duration} list={list} setList={setList} />)}
        </div>
        
      </div>



       </div>
    </>
  )
}

export default WeekView
