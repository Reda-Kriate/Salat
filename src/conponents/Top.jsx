import React,{ useState,useEffect } from 'react' 
import Salaat from "./Salat"
import "./Tooop.css"
import axios from 'axios'
import moment from "moment"
import Navv from './Nav'
import { langage } from './LangData'
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
const [nextPrayerArabic,setNextPrayerArabic]=useState();
const countTime = ()=>{
    const momentNow = moment();
    // knowing what is the next prayer
    let prayer = "";
    if(momentNow.isAfter(moment(info["Fajr"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Dhuhr"],"hh:mm"))){
            console.log("the next prayer is : Dhuhr")
            setNextPrayer("Dhuhr")
            setNextPrayerArabic("الظهر")
            prayer="Dhuhr"
        }
        else if(momentNow.isAfter(moment(info["Dhuhr"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Asr"],"hh:mm"))){
            console.log("the next prayer is : Asr")
            setNextPrayer("Asr")
            setNextPrayerArabic("العصر")
            prayer="Asr"
        }
        else if(momentNow.isAfter(moment(info["Asr"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Maghrib"],"hh:mm"))){
            console.log("the next prayer is : Maghrib")
            setNextPrayer("Maghrib")
            setNextPrayerArabic("المغرب")
            prayer="Maghrib"
        }
        else if(momentNow.isAfter(moment(info["Maghrib"],"hh:mm")) && 
        momentNow.isBefore(moment(info["Isha"],"hh:mm"))){
            console.log("the next prayer is : Isha")
            setNextPrayer("Isha")
            setNextPrayerArabic("العشاء")
            prayer="Isha"
        }
        else{
            console.log("the next prayer is : Fajr")
            setNextPrayer("Fajr")
            setNextPrayerArabic("الفجر")
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
//hide nav
const [changeHideNav,setChangeHideNav] = useState("big-div1-hide")

const [classIconSwip, setClassIconSwip]= useState("fa-solid fa-down-long")
const hideNav = ()=>{
if(changeHideNav=="big-div1"){
    setChangeHideNav("big-div1-hide")
    setClassIconSwip("fa-solid fa-down-long")
}
else{
    setChangeHideNav("big-div1")
    setClassIconSwip("fa-solid fa-up-long")
}
}
// dark light mode button
const [classTheme,setClassTheme ]=useState("fa-solid fa-moon")
const changeTheme = ()=>{
    if(classTheme=="fa-solid fa-moon"){
        setClassTheme("fa-solid fa-sun")
    }else{
        setClassTheme("fa-solid fa-moon")
    }
}
// change langage 
const [tempr,setTempr]=useState(langage[2].tempsReste)
const [search,setSearch]=useState(langage[2].search)
const [chTh,setChTh]=useState(langage[2].changeTh)
const [chLg,setChLg]=useState(langage[2].changeLang)
const [placeH,setPlaceH]=useState(langage[2].placeHolder)
const [mood,setMood]=useState(false);
const [styleDiv1,setStyleDiv1]=useState("div-one1");
const [styleDiv2,setStyleDiv2]=useState("div-two1");
const changeLangage = (i)=>{
    setTempr(langage[i].tempsReste);
    setSearch(langage[i].search)
    setPlaceH(langage[i].placeHolder)
    setChTh(langage[i].changeTh)
    setChLg(langage[i].changeLang)
}
const changemoodTrue = ()=>{
    setMood(true);
    setFajr(langage[0].Fajr);
    setDhuhr(langage[0].Dhuhr);
    setAsr(langage[0].Asr);
    setMaghrib(langage[0].Maghrib);
    setIsha(langage[0].Isha);
    setStyleDiv1("div-one1-arabic");
    setStyleDiv2("div-two1-arabic");
}
const changemoodFalse = ()=>{
    setMood(false);
    setFajr(langage[1].Fajr);
    setDhuhr(langage[1].Dhuhr);
    setAsr(langage[1].Asr);
    setMaghrib(langage[1].Maghrib);
    setIsha(langage[1].Isha);
    setStyleDiv1("div-one1");
    setStyleDiv2("div-two1");
}
const [fajr , setFajr] = useState(langage[1].Fajr)
const [dhuhr , setDhuhr] = useState(langage[1].Dhuhr)
const [asr , setAsr] = useState(langage[1].Asr)
const [maghrib , setMaghrib] = useState(langage[1].Maghrib)
const [isha , setIsha] = useState(langage[1].Isha)
const displayNextPrayer = ()=>{
    if(mood){
        return (nextPrayerArabic)
    }else{
        return(nextPrayer)
    }
}
    return(<>
    <Navv 
        thText={chTh}
        lgText={chLg}
        divNav={changeHideNav}
        themeee={classTheme}  
        clickFunc={changeTheme}  
        arFunc = {()=>{changeLangage(0)
                        changemoodTrue()
        }}
        frFunc = {()=>{changeLangage(1)
                        changemoodFalse()
        }}
        enFunc = {()=>{changeLangage(2)
                    changemoodFalse()
        }}
        styleDiv1={styleDiv1}
        styleDiv2={styleDiv2}
    />
    <div className="div-button-nav">
    <button id="button-nav" className="button-nav" onClick={hideNav}><i className={classIconSwip}></i></button>
    </div>

    <div className="big-div">
        <div className="div-one">
            <h1>{tempr}{displayNextPrayer()} </h1>
            <p>{`${nextTimePrayer}`}</p>
        </div>
        <div className="div-two">
            <h1>{formateDate()}</h1>
            <p>{city.toUpperCase()}</p>
        </div>
    </div>
    <div className="sec-part">
    <div className="div-search">
        <input placeholder={placeH} type="text" value={inputVal} onChange={handleChange}/>
        <button onClick={clickChange}>{search}</button>
    </div>
    <div className="div-salat">
    <Salaat
    image="../src/assets/10.jpg"
    adan={fajr}
    temp={info.Fajr}
    />
    <Salaat
        image="../src/assets/20.jpg"
        adan={dhuhr}
        temp={info.Dhuhr}
    />
    <Salaat
        image="../src/assets/30.jpg"
        adan={asr}
        temp={info.Asr}
    />
    <Salaat
        image="../src/assets/40.jpg"
        adan={maghrib}
        temp={info.Maghrib}
    />
    <Salaat
        image="../src/assets/50.jpg"
        adan={isha}
        temp={info.Isha}
    />
    </div>
    </div>

    </>)
}
export default Tooop