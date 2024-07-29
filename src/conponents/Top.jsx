import React,{ useState,useEffect } from 'react' 
import Salaat from "./Salat"
import "./Tooop.css"
import axios from 'axios'
import moment from "moment"
function Tooop(){
    // console.log(moment().format("YYYY:MM:Do / hh:mm"))
    //fetching data
    const [info,setInfo] = useState([
        {
            Fajr:"04:54",
            Dhuhr:"13:39",
            Asr:"17:19",
            Maghrib:"20:35",
            Isha:"22:01",
        },
]);
const [city , setCity] = useState("SALE");
const [inputVal , setInputVal] = useState("");
const [nextPrayer , setNextPrayer] = useState();
const [nextTimePrayer , setNextTimePrayer] = useState("");
// const [nextPrayerIndex , setNextPrayerIndex ] = useState();
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
useEffect(()=>{
    const interval = setInterval(()=>{
        countTime()
    },1000)
    return ()=>{
        clearInterval(interval)
    }
},[info])

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
const countTime = ()=>{
    const momentNow = moment();
    // knowing what is the next prayer
    let prayer = "";
    if(momentNow.isAfter(moment(info["Fajr"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Dhuhr"],"hh:mm"))){
            console.log("the next prayer is : Dhuhr")
            setNextPrayer("Dhuhr")
            prayer="Dhuhr"
        }
        else if(momentNow.isAfter(moment(info["Dhuhr"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Asr"],"hh:mm"))){
            console.log("the next prayer is : Asr")
            setNextPrayer("Asr")
            prayer="Asr"
        }
        else if(momentNow.isAfter(moment(info["Asr"],"hh:mm")) && 
        momentNow.isBeforeBefore(moment(info["Maghrib"],"hh:mm"))){
            console.log("the next prayer is : Maghrib")
            setNextPrayer("Maghrib")
            prayer="Maghrib"
        }
        else if(momentNow.isAfter(moment(info["Maghrib"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Isha"],"hh:mm"))){
            console.log("the next prayer is : Isha")
            setNextPrayer("Isha")
            prayer="Isha"
        }
        else{
            console.log("the next prayer is : Fajr")
            setNextPrayer("Fajr")
            prayer="Fajr"
        }
        //knowing the next time prayer
        const nextPrayerTime =info[prayer]
            console.log(nextPrayerTime)
        //transform the next time prayer to moment
            const nextPrayerTimeMoment = moment(nextPrayerTime,"hh:mm")
        //knowing time difference between salat and the current moment with millisecendes
            let timeDifference = nextPrayerTimeMoment.diff(momentNow)
        //condition for salat al fajr if we are before 00:00
        if(timeDifference<0){
            //diffence between current moment and 00:00
            let midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow);
            //difference between salat fajr and 00:00
            let fajrMidnight = nextPrayerTimeMoment.diff(moment("00:00:00","hh:mm:ss"));
            const totalDifferenceFajr = midnightDiff + fajrMidnight;
            timeDifference = totalDifferenceFajr
        }
        const timeDuration = moment.duration(timeDifference)
        let NextTimePrayerVar = `${addZero(timeDuration.hours())}:${addZero(timeDuration.minutes())}:${addZero(timeDuration.seconds())}`;
        setNextTimePrayer(NextTimePrayerVar)
        console.log(NextTimePrayerVar)
}



    return(<>
    <div className="big-div">
        <div className="div-one">
            <h1>Le temps resté pour salat {nextPrayer} </h1>
            <p>{`${nextTimePrayer}`}</p>
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
    adan="Fajr"
    temp={info.Fajr}
    />
    <Salaat
        image="../src/assets/20.jpg"
        adan="Dhuhr"
        temp={info.Dhuhr}
    />
    <Salaat
        image="../src/assets/30.jpg"
        adan="Asr"
        temp={info.Asr}
    />
    <Salaat
        image="../src/assets/40.jpg"
        adan="Maghrib"
        temp={info.Maghrib}
    />
    <Salaat
        image="../src/assets/50.jpg"
        adan="Isha"
        temp={info.Isha}
    />
    </div>
    </div>

    </>)
}
export default Tooop