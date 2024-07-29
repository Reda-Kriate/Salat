import './Nav.css'
function Navv(props){
    return(<>
        <div className={props.divNav}>
            <div className="div-one1">
                <p>{props.lgText}</p>
                <button onClick={props.arFunc}>Ar</button>
                <button onClick={props.frFunc}>Fr</button>
                <button onClick={props.enFunc}>En</button>
            </div>

            <div className="div-two1">
                <p>{props.thText}</p>
                <button onClick={props.clickFunc}><i className={props.themeee}></i></button>
            </div>
        </div>
    </>)
}
export default Navv