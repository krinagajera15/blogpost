import {NavLink,useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ConformModel } from './ConfirmationModal';
import { useContext, useState } from 'react';
import Loder from './Loder';
import { Editpost } from './EditPostModel';
import Modecontext from '../Context/ModeContext';


const Navbar=(props)=>{
    const naviget = useNavigate();

    const [showModel,setShowModel]=useState(false);
    const [showProfileModel,setShowProfileModel]=useState(false);
    const [loading, setLoading] = useState(false);
    const ctx=useContext(Modecontext);
    console.log(ctx,"Context Value");
    


    const handleShowProfileModel=()=>{
        setShowProfileModel(true);
    }
    const handleHideProfileModel=()=>{
        setShowProfileModel(false);
    }
    const handleShowModel=()=>{
        setShowModel(true);
    }

    const handleHideModel=()=>{
        setShowModel(false);
    }
    const logedindata=JSON.parse(localStorage.getItem("LoginData"))||{}
    console.log(logedindata);

    const userInitial=logedindata?.role?.charAt(0).toUpperCase();
    console.log(userInitial);
    
    
    const handleLogout=(e)=>{
        setLoading(true);
        e.preventDefault();
        toast.success("Logout SuccessFull");
        localStorage.removeItem("LoginData");
        setShowModel(false);
        setTimeout(() => {
            setLoading(false)
            naviget("/login");
        }, 2000);
        
    }

    return(
        <>
        {loading&&<Loder/>}
        <ToastContainer />
        <nav className={`nav-main-class ${ctx?.mode=="dark"?"nav-dark":"nav-light"}`}>
            <div className="logo-class">
                    <h1>{props.logo}</h1>
            </div>
            <div className="menu-class">
                <ul>
                    <li>
                        <NavLink to={"/"} className={({isActive})=>(isActive?"active-link":"")}>{props.hom}</NavLink>
                    </li>
                    {logedindata?.role==="admin"? 
                    <li>
                        <NavLink to={"/new-post"} className={({isActive})=>(isActive?"active-link":"")}>{props.npst}</NavLink>
                    </li>:<></>} {/*aa perform karva ni 2 method che 1>ternuryopretor  2>andopretor */}
                    {/* {logedindata?.role==="admin"&&
                    <li>
                        <NavLink to={"/new-post"} className={({isActive})=>(isActive?"active-link":"")}>{props.npst}</NavLink>
                    </li>} */}
                    <li>
                        <NavLink to={"/explorpost"} className={({isActive})=>(isActive?"active-link":"")}>{props.exp}</NavLink>
                    </li>
                    <li>
                        <NavLink to={"#"} onClick={handleShowModel}>{props.lgot}</NavLink>
                    </li>
                    
                </ul>
            </div>
            
            <div className="them-class" onClick={ctx?.toggleMode}>{ctx?.mode==="dark"?"light":"dark"}
            <div className='role-class' onClick={handleShowProfileModel}>{userInitial}</div>
            </div>
            
            
        </nav>
        {showProfileModel&&<Editpost userId={logedindata?.id} onClose={handleHideProfileModel}/>}
        {showModel &&<ConformModel title={"Logout"} desc={"Are you Sure LogedOut..??"} onClose={handleHideModel} onConfirm={handleLogout} ConfirmBtnText={"Logout"}/>}
        </>
    );
}
export default Navbar;