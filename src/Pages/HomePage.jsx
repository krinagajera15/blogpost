import { toast, ToastContainer } from "react-toastify";
import Card from "../Component/Card";
import { ConformModel } from "../Component/ConfirmationModal";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snowfall from 'react-snowfall'
import Loder from "../Component/Loder";
import imgs from"../assets/image/up-arrow (2).png"
import Modecontext from "../Context/ModeContext";

export const Homepage=()=>{

  const naviget = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [allPostData, setAllPostData] = useState(JSON.parse(localStorage.getItem("postdata"))||[]);
  const [selectedIndex, setSelectIndex] = useState(null);
  const ctx=useContext(Modecontext);
  console.log(ctx,"Home Context Value");
  

  const [loading, setLoading] = useState(false);

   //aro par click kari to top ma jatu rey te
   const scrollToSection=(id)=>{
    const element=document.getElementById(id);
    if(element){
        element.scrollIntoView({behavior:"smooth"});
    }
};
 
     const handleShowModel=(index)=>{
      setSelectIndex(index);
      setShowModal(true);
     }
 
     const handleDelet=()=>{
      setLoading(true)
      const updatedPostData = allPostData.filter((_, i) => i !== selectedIndex);
      setAllPostData(updatedPostData);
      localStorage.setItem("postdata", JSON.stringify(updatedPostData));
      setShowModal(false);
      toast.success("Post Deleted Successfully!");
         setTimeout(() => {
          setLoading(false);
             naviget("/");
         }, 2000)
         
     }

     const handleEdit=(id)=>{
      setLoading(true);
      console.log({id});
      naviget("/new-post",{state:{id}})
     }

     const clickHandler=(id)=>{
      naviget(`/posts/${id}`);
     }
    
    return(
        <>
        <div className={`main-home-class ${ctx?.mode}`}>
        <span id="Top"></span>
        {loading&&<Loder/>}
        <Snowfall  color="#102A43"  
                   snowflakeCount={500} 
                   style={{position: 'fixed',width: '100vw',height: '100vh'}}
          />  
        <ToastContainer/>
    
        <h1 className='tital'>Created Posts</h1>
      <div className="content">
       {allPostData.length==0? 
       <p className="error-data-class">No Data Found </p>
       :allPostData.map((item,index)=>{
          console.log("item",item);
          return <Card  key={index} 
                        img={item.image}  
                        title={item.title} 
                        desc={item.body} 
                        onEdit={()=>handleEdit(item.id)} 
                        showActions={true} 
                        onRedirect={()=>clickHandler(item.id)} 
                        onDelete={()=>handleShowModel(index)} />

       })}
      </div>
      <img src={imgs} height={100} className="sbtn"  onClick={()=>{scrollToSection("Top")}}/>
      {showModal &&<ConformModel title={""} 
                                 desc={"Are you Want to Delete This Card..??"} 
                                 onClose={()=>setShowModal(false)} 
                                 onConfirm={handleDelet} 
                                 ConfirmBtnText={"Delete"}/>}
      
      </div>
        </>

    );
}