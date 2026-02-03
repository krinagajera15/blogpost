import React from 'react';
import Lottie from 'react-lottie-player';
import Nodatafoundimg from '../assets/image/nodata.json'
import Navbar from './Navbar';
import { MdDarkMode } from 'react-icons/md';
export function NodataFound(){
    
    
    return(
        <>
        {/* <Navbar logo={"BlogPost"} hom={"Home"} npst={"Newpost"} spage={"SinglePost"} lgot={"Logout"} icon={<MdDarkMode/>} themd={"Dark"}/> */}
        <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
            <Lottie 
            animationData={Nodatafoundimg}
            play
            style={{width:500 , height:400}}/>
            <h1 style={{display:'flex', fontSize:90}}>Oops..!!🤦‍♀️404</h1>
            <h3 style={{display:'flex', fontSize:60, color:'red'}}>No Data Found</h3>
        </div>
        </>
    );
}