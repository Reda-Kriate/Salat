import './Nav.css'
function Navv(props){
    return(<>
        <div className={props.divNav}>
            <div className={props.styleDiv1}>
                <p>{props.lgText}</p>
                <button className="button" onClick={props.arFunc}>Ar</button>
                <button className="button" onClick={props.frFunc}>Fr</button>
                <button className="button" onClick={props.enFunc}>En</button>
            </div>

            <div className={props.styleDiv2}>
                <p>{props.thText}</p>
                <button className="button" onClick={props.clickFunc}><i className={props.themeee}></i></button>
            </div>
        </div>
    </>)
}
export default Navv