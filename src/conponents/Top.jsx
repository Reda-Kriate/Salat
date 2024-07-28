import React,{ useState,useEffect } from 'react' 
import Salaat from "./Salat"
import "./Tooop.css"
import axios from 'axios'
import moment from "moment"
function Tooop(){
    // console.log(moment().format("YYYY:MM:Do / hh:mm"))
    //fetching data
    const [info,setInfo] = useState("");
    const [city , setCity] = useState("SALE")
const [inputVal , setInputVal] = useState("")
    async function getData(){
        try {
        const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=MA&city=${city}`);
        console.log("this is ur data : " ,res.data)
        setInfo(res.data.data.timings)
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
useEffect(()=>{
    getData();
},[city])
//clock start
const [time,setTime]=useState(new Date());

useEffect(()=>{
    const interval = setInterval(()=>{
        setTime(new Date())
    },1000);
    return ()=>{clearInterval(interval)}
},[])

function formateDate(){
    let hours = time.getHours();
    let min = time.getMinutes();
    let day = time.getUTCDate();
    let months = time.getMonth()+1;
    let year = time.getFullYear()
    return(`${addZero(hours)}:${addZero(min)} | ${addZero(day)}/${addZero(months)}/${year}`)
}

function addZero(i){
    if(i<10){
        return(`0${i}`)
    }
    else{
        return i
    }
}
// clock end
const handleChange=(e)=>{
    setInputVal(e.target.value)
    
}
const clickChange = ()=>{
    if(inputVal){
    setCity(inputVal)
    setInputVal("")
    }else{
        setCity("SALE")
    }
}
//calcule temps teste
const caltime = ()=>{

}
    return(<>
    <div className="big-div">
        <div className="div-one">
            <h1>Le temps resté pour la prochaine priére </h1>
            <p>00:00:00</p>
        </div>
        <div className="div-two">
            <h1>{formateDate()}</h1>
            <p>{city.toUpperCase()}</p>
        </div>
    </div>
    <div className="sec-part">
    <div className="div-search">
        <input type="text" value={inputVal} onChange={handleChange}/>
        <button onClick={clickChange}>Search</button>
    </div>
    <div className="div-salat">
    <Salaat
    image="../src/assets/10.jpg"
    adan="Al-Fajr"
    temp={info.Fajr}
    />
    <Salaat
        image="../src/assets/20.jpg"
        adan="Al-Dohr"
        temp={info.Dhuhr}
    />
    <Salaat
        image="../src/assets/30.jpg"
        adan="Al-Asr"
        temp={info.Asr}
    />
    <Salaat
        image="../src/assets/40.jpg"
        adan="Al-Maghreb"
        temp={info.Maghrib}
    />
    <Salaat
        image="../src/assets/50.jpg"
        adan="Al-Ichae"
        temp={info.Isha}
    />
    </div>
    </div>

    </>)
}
export default Tooop