import'./Signin.css'
import img from'../assets/image/log1.png'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loder from './Loder';

export const SignIn=()=>{

    const [loading, setLoading] = useState(true);

    useEffect(() => {
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 3000);
            
                return () => clearTimeout(timer);
    }, []);

    const [mobileNo,setMobile]=useState("");
    const[role,setRol]=useState("");
    const[Otp,setOtp]=useState("");
    const[mobileNoValidation,setMobileNoValidation]=useState("");
    const[roleValidation,setroleValidation]=useState("");
    const[sentOtpValidation,setsentOtpValidation]=useState("");
    const[generetOtp,setGenretOtp]=useState("");//otp and setotp ne sem karva mate usestatelevo pade
    const random=Math.floor(1000 + Math.random() * 9000);//1000 to 9000 ni vache no rendom number aapse
    const naviget=useNavigate();

    const handleGeneratOtp=(event)=>{
        event.preventDefault();
        setOtp(random.toString());
        setGenretOtp(random.toString());//genreted otp ni value store kare che\
        setsentOtpValidation("")
        alert("Your Otp Number:"+ random);
    }
    const handlephoneChange=(event)=>{
        setMobile(event.target.value)
        setMobileNoValidation("");
        console.log(mobileNo);
    }
    const handleroleValue=(event)=>{
        setRol(event.target.value)
        setroleValidation("");
        console.log(event.target.value);
    }
    const handleotpChange=(event)=>{
        setOtp(event.target.value)
        setsentOtpValidation("")
        console.log(Otp);
       
    }
    const handleSubmit= async(event)=>{
        event.preventDefault();
        setLoading(true)
        //otp sem na thay to error aave
         if(generetOtp != Otp){
            toast.warning("Otp are Invelid");
            return;
        }

        //validetion mate che jo value inputed na hoy to
        if(!mobileNo){
            setMobileNoValidation("Mobile Number Requird.....");
        }
        if(!role){
            setroleValidation("Selected Role Requird.....");
        }
        if(!Otp){
            setsentOtpValidation("Otp Requird....");
            
        }
        //jo aa condition sachi thay to j form submit thay wrong thay to form submit na thay
        if(!mobileNo||!role||!Otp){
            return;
        }
        const formData={mobileNo,role,Otp}
        try{
            const reasponse=await fetch("https://696b4ad2624d7ddccaa0b91e.mockapi.io/user");

            const users=await reasponse.json();

            const existingUser=users?.find(
                (user)=>
                    user.mobileNo==mobileNo&&
                    user.role==role
            );

            if(existingUser){
                const userExistingData=existingUser;
                toast.success("Login Successfully")
                setTimeout(()=>{
                    localStorage.setItem("LoginData",JSON.stringify(userExistingData));
                    naviget("/");
                } ,2000);
            
            }
            else{
                try{
                    const reasponse=await fetch("https://696b4ad2624d7ddccaa0b91e.mockapi.io/user",{
                        method:"POST",
                        headers:{
                            "Content-type":"application/json",
                        },
                        body: JSON.stringify(formData),
                    });
                    console.log({reasponse});
                    if(!reasponse.ok)
                    {
                        toast.error("something went wrong!!!");
                    }
                    const data=await reasponse.json();
                    console.log(data);
                    //console.log(formData);
                    toast.success("Successfully")
                    localStorage.setItem("LoginData",JSON.stringify(data));
                    setTimeout(()=>{
                        setLoading(false);
                        naviget("/");
                    } ,2000);
                }catch{
                    toast.error("Error...🤦‍♀️")
                }
            }
        }catch{
            toast.error("Error...🤦‍♀️")
        }  
        
    }
    return(
        <>
        {loading&&<Loder/>}
            <div className="sign-main-class"> 
                <div className="image-main-class">
                    <img src={img} height={606} width={660}/>                
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="filed-main-class">
                        <div className='heidng-class'>
                            <h1 className="main-heding-class">Hello Again,</h1>
                            <h3 className="sub-heding-class">Welcome Back,Let's Get Start</h3>
                        </div>

                        <div className='all-filed-class'>
                            <div className="feild-class">
                                <input type="phone" name="mobileNo" maxLength={10} pattern='[0-9]{10}' value={mobileNo}  placeholder="Mobile No." onChange={handlephoneChange}/>
                                {mobileNoValidation&&<p className='error-class'>{mobileNoValidation}</p>}
                            </div>
                            <div className="option-class">
                                <select className="select-class" name="role" value={role} onChange={handleroleValue}>
                                    <option value={""}>Select a role</option>
                                    <option value={"user"}>User</option>
                                    <option value={"admin"}>Admin</option>
                                </select>
                                {roleValidation && <p className='error-class'>{roleValidation}</p>}
                            </div>
                            <div className="otp-btn-class">
                                <button type='button' onClick={handleGeneratOtp} className="btn-otp-class">Generate Otp</button>
                            </div>
                            <div className="feild-class">
                                <input type="text" placeholder="Enter Otp" maxLength={4}  value={Otp} name="sentOtp" onChange={handleotpChange}/>
                                {sentOtpValidation&&<p className='error-class'>{sentOtpValidation}</p>} 
                                                   
                            </div>
                            <div className="btnlog-class">
                                <button type='submit' className="btn-lgin-class" >Login</button>
                            </div>
                            <ToastContainer/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}