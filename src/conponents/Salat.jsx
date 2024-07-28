import './Salat.css'
function Salaat(props){
    return(<>
    <div className="salat-div">
        <div className="img-div"><img src={props.image} alt="" /></div>

        <h3>{props.adan}</h3>
        <p>{props.temp}</p>
    </div>
    </>)
}
export default Salaat