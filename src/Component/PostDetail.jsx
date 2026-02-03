import { useEffect, useState } from 'react';
import { ConformModel } from './ConfirmationModal';
import'./PostDetail.css'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export const PostDetail=()=>{
    const postData=JSON.parse(localStorage.getItem("postdata"))||[]
    const {singlpge}=useParams();
    const naviget=useNavigate()

    const [currentPost,setCurrentPost]=useState({});

    const logedindata=JSON.parse(localStorage.getItem("LoginData"))||{}
    useEffect(()=>{

        const filtered=postData.find(item=>String(item.id)===String(singlpge))
        console.log({postData,singlpge,filtered});
        

    if(filtered) setCurrentPost(filtered)

    },[singlpge,localStorage]);

    const [showModel,setShowModel]=useState(false);

    const handleShowModel=()=>{
        setShowModel(true);
    }

    const handleHideModel=()=>{
        setShowModel(false);
    }
    const handleEdit=(id)=>{
        console.log("id:",id);
        naviget("/new-post",{state:{id :singlpge}});
    }

    const handleDelet=()=>{
        const updatedPostData = postData.filter(item=>String(item.id)!==String(singlpge));
        localStorage.setItem("postdata", JSON.stringify(updatedPostData));
        setShowModel(false);
        toast.success("Post Deleted Successfully!");
        setTimeout(() => {
            naviget("/");
        }, 2000)
                 
    }
    
    return(
        <>
        <ToastContainer/>
            <div className="post-class">
                <div className="post-image-class">
                    <img src={currentPost.image}  height={310} width={300}/>
                </div>
                <div className="post-Desc-class">
                    <div className="post-tital-class">
                        {currentPost.title}
                    </div>
                    <div className="post-desc-class">
                        {currentPost.body}
                    </div>
                    <div className='post-btn-class'>
                    {logedindata?.role==="admin" ?
                        <button className="post-btnet-class" onClick={handleEdit}>
                            Edit    
                        </button>:<></>}
                        {logedindata?.role==="admin" ?
                        <button className="post-btndlt-class" onClick={handleShowModel}>
                            Delete
                        </button>:<></>}
                    </div>

                </div>

            </div>
             {showModel &&<ConformModel title={"Delete Post"} desc={"Are you Want to Delet This..??"} onClose={handleHideModel} onConfirm={handleDelet} ConfirmBtnText={"Delete"}/>}
        </>
    );
}