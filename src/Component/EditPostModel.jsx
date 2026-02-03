import { useEffect, useState } from 'react';
import './EditPostModel.css'
import Loder from './Loder';
export const Editpost=({userId,onClose})=>{

    const [loading, setLoading] = useState(true);
    const [editpostForm, setEditpostForm] = useState({
        name: "",
        mobileNo: "",
        role: "",
        Otp:"",
        });
        const [errors, setError] = useState({});
      

        const handelChange = (feild, value) => {//feild = je feilad nu name aapu hoy te
            setError((e) => ({ ...e, [feild]: "" })); //error msge ne remove karva ate,'...e'=spread opretor
            setEditpostForm({ ...editpostForm, [feild]: value }); //usestate ma valu store karva mate
            console.log(editpostForm);
        
          };
          useEffect(()=>{
            if(userId){
                fetchUserById();
            }
            
          },[userId]);

          const fetchUserById=async()=>{
            try{
                setLoading(true);
                const reasponse=await fetch(`https://696b4ad2624d7ddccaa0b91e.mockapi.io/user/${userId}`
            );
            const data=await reasponse.json();
            setEditpostForm({
                name:data?.name||"",
                mobileNo:data?.mobileNo||"",
                role:data?.role||"",
                Otp:data?.Otp||"",

            });
          }catch(error){
            console.error("fetch user error",error);
          }finally{
            setLoading(false);
          }
        }
          const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            const newError = {};
            if (!editpostForm.name.trim()) newError.name = "name Requird.....";
            if (!editpostForm.mobileNo.trim()) newError.mobileNo = "MobileNo Requird.....";
            if (!editpostForm.role.trim()) newError.role = "role Requird....";
            if (!editpostForm.Otp.trim()) newError.Otp = "otp Requird....";
        
            setError(newError);
            if (Object.keys(newError).length > 0){ setLoading(false); return;}

            try {
                const reasponse=await fetch(`https://696b4ad2624d7ddccaa0b91e.mockapi.io/user/${userId}`,{
                        method: "PUT",
                        headers:{
                                    "Content-type":"application/json",
                                },
                     body: JSON.stringify(editpostForm
                    //    { name: editpostForm.name,
                    //     mobileNo: editpostForm.mobileNo,
                    //     role: editpostForm.role,
                    //     Otp: editpostForm.Otp, }
                    // }
                    ),
                }); 
            
                if (!reasponse.ok) {
                    alert("something went wrong!!!");
                }
            
                const updatedUserData = await reasponse.json();
                console.log("Edit Data:",updatedUserData);
                
                alert("Post Edit Successfully");
                onClose(true);
                localStorage.setItem("LoginData", JSON.stringify(updatedUserData));
            
            } catch (error) {
                console.error("Error:", error.message);
            } finally {
               
            }
          }
          useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);
        
            return () => clearTimeout(timer);
        }, []);
    return(
        <>
        {loading&&<Loder/>}
            <div className="main-post-class">
            <form className="main-post-form-class" onSubmit={handleSubmit}>

                <h1 className="heding-post-class">Edit Your Details</h1>

                <div className="filed-post-main-class">
                    <div className="post-filed-class">

                        <input type="text" name='name' placeholder="Enter Name" value={editpostForm.name} onChange={(e) => handelChange("name", e.target.value)}/>
                        {errors.name && <p className="error-class">{errors.name}</p>}
                    </div>
                    <div className="post-filed-class">

                        <input type="phone" name='mobileNo' value={editpostForm.mobileNo} placeholder="Enter Mobile Number" onChange={(e) => handelChange("mobileNo", e.target.value)}/>
                        {errors.mobileNo && <p className="error-class">{errors.mobileNo}</p>}
                    </div>
                    <div className="option-class">

                        <select className="select-class" disabled name="role" value={editpostForm.role}>
                            <option value={"user"}>User</option>
                            <option value={"admin"}>Admin</option>
                        </select>                 
                        {errors.role && <p className="error-class">{errors.role}</p>}
                    </div>
                    <div className="post-filed-class">

                        <input type="text" name='Otp' disabled value={editpostForm.Otp} placeholder="Enter Otp" onChange={(e) => handelChange("Otp", e.target.value)}/>
                        {errors.Otp && <p className="error-class">{errors.Otp}</p>}
                    </div>
                    <div className="btn-post-class">
                    <button className="btn-csl-class" onClick={onClose}>Cancel</button>
                       <button className="btn-submit-class">Submit</button>
                    </div>
                </div>
                </form>
            </div>

       
        </>
    );
}