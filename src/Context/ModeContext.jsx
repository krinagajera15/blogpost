import React from "react";
import { useState } from "react"

const Modecontext=React.createContext({
    mode:"light",
    toggleMode:()=>{},
});

export const ModeContextProvider=(props)=>{
    const[mode,setMode]=useState("Light");
    const toggleMode=()=>{
        if(mode==="light"){
            setMode("dark");
        }else{
            setMode("light");
        }
    };
    return(
        <>
        <Modecontext.Provider value={{mode:mode,toggleMode}}>
            {props.children}
        </Modecontext.Provider>
        </>
    );

}
export default Modecontext;
