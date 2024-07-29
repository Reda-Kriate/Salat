import './Nav.css'
function Navv(props){
    return(<>
        <div className={props.divNav}>
            <div className="div-one1">
                <p>Change Langage : </p>
                <button>Ar</button>
                <button>Fr</button>
                <button>En</button>
            </div>

            <div className="div-two1">
                <p>Change Theme :</p>
                <button onClick={props.clickFunc}><i class={props.themeee}></i></button>
            </div>
        </div>
    </>)
}
export default Navv