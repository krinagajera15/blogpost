import { useContext } from 'react';
import Modecontext from '../Context/ModeContext';
import './Card.css';

const Card=(props)=>{

     const ctx=useContext(Modecontext);
      console.log(ctx,"Card Context Value");

    const logedindata=JSON.parse(localStorage.getItem("LoginData"))||{}
    return(
        <>
        <div className={`main-card-class ${ctx.mode}`}>
            
            <div className="img-class" onClick={props.onRedirect}>
                <img src={props.img?props.img:`https://picsum.photos/id/${props.id}/800/800`} height={250} width={315}/>
            </div>
            <div className="tital-class">{props.title}</div>
            <div className="desc-class">
                {props.desc.length > 99 ?props.desc.substring(0,99) +"..." : props.desc}
            </div>

        <div className='btn'>
            {logedindata?.role==="admin" ?
            <button className='btnedt' onClick={props.onEdit}>Edit</button>:<></>}
            {logedindata?.role==="admin" ?
            <button className='btncls' onClick={props.onDelete} >Delete</button> :<></>}
            </div>
        </div>
       
        </>
    );
}
export default Card;