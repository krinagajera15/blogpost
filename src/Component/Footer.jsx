import { useContext } from 'react';
import Modecontext from '../Context/ModeContext';
import './Footer.css'

export  const Footr=()=>{

    const ctx=useContext(Modecontext);
      console.log(ctx,"Footer Context Value");

    return(
        <>
            <div className={`main-footer-class ${ctx.mode}`}>
                
                <p>&copy; {new Date().getFullYear()} All rights are reserved  &nbsp;<b>BlogPost</b></p>
                
            </div>
        </>
    );
}