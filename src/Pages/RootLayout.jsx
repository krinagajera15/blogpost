import { Outlet } from "react-router-dom"
import Navbar from "../Component/Navbar"
import { MdDarkMode } from "react-icons/md"
import {Footr} from "../Component/Footer"

export const RouterLayout=()=>{
// aa levathi navbar je badha page ma call karavta te anhiya 1 var call karavi 
//  ne pachi router vala page ma call kari devanu atle 1 varj call karvu pade
    return(
        <>
         <Navbar logo={"BlogPost"} hom={"Home"} npst={"Newpost"} spage={"SinglePost"} lgot={"Logout"} exp={"ExplorePost"} icon={<MdDarkMode/>} themd={"Dark"}/>
        <Outlet/>
        <Footr/>
        </>
    )
}